// server/models/Project.js

const { pool } = require('../config/db');

class Project {
  /**
   * Get all projects with optional category filter
   * @param {string|null} category - Category slug to filter by (optional)
   * @returns {Promise<Array>} - Array of project objects
   */
  static async getAll(category = null) {
    try {
      let query = `
        SELECT p.*, c.name as category, c.slug as category_slug
        FROM projects p
        JOIN categories c ON p.category_id = c.id
      `;
      
      const params = [];
      
      if (category) {
        query += ` WHERE c.slug = ?`;
        params.push(category);
      }
      
      query += ` ORDER BY p.featured DESC, p.created_at DESC`;
      
      const [projects] = await pool.query(query, params);
      
      // Get technologies for each project
      for (const project of projects) {
        const [technologies] = await pool.query(`
          SELECT t.name
          FROM technologies t
          JOIN project_technologies pt ON t.id = pt.technology_id
          WHERE pt.project_id = ?
        `, [project.id]);
        
        project.technologies = technologies.map(tech => tech.name);
      }
      
      return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }
  
  /**
   * Get a specific project by its slug
   * @param {string} slug - Project slug
   * @returns {Promise<Object|null>} - Project object or null if not found
   */
  static async getBySlug(slug) {
    try {
      const [projects] = await pool.query(`
        SELECT p.*, c.name as category, c.slug as category_slug
        FROM projects p
        JOIN categories c ON p.category_id = c.id
        WHERE p.slug = ?
      `, [slug]);
      
      if (projects.length === 0) {
        return null;
      }
      
      const project = projects[0];
      
      // Get technologies for the project
      const [technologies] = await pool.query(`
        SELECT t.name
        FROM technologies t
        JOIN project_technologies pt ON t.id = pt.technology_id
        WHERE pt.project_id = ?
      `, [project.id]);
      
      project.technologies = technologies.map(tech => tech.name);
      
      // Get related projects from the same category
      const [relatedProjects] = await pool.query(`
        SELECT id, title, slug, image
        FROM projects
        WHERE category_id = ? AND id != ?
        ORDER BY RAND()
        LIMIT 3
      `, [project.category_id, project.id]);
      
      project.relatedProjects = relatedProjects;
      
      return project;
    } catch (error) {
      console.error('Error fetching project by slug:', error);
      throw error;
    }
  }
  
  /**
   * Get featured projects
   * @param {number} limit - Maximum number of projects to return
   * @returns {Promise<Array>} - Array of featured project objects
   */
  static async getFeatured(limit = 3) {
    try {
      const [projects] = await pool.query(`
        SELECT p.*, c.name as category, c.slug as category_slug
        FROM projects p
        JOIN categories c ON p.category_id = c.id
        WHERE p.featured = TRUE
        ORDER BY p.created_at DESC
        LIMIT ?
      `, [limit]);
      
      // Get technologies for each project
      for (const project of projects) {
        const [technologies] = await pool.query(`
          SELECT t.name
          FROM technologies t
          JOIN project_technologies pt ON t.id = pt.technology_id
          WHERE pt.project_id = ?
        `, [project.id]);
        
        project.technologies = technologies.map(tech => tech.name);
      }
      
      return projects;
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      throw error;
    }
  }
  
  /**
   * Get all project categories
   * @returns {Promise<Array>} - Array of category objects
   */
  static async getCategories() {
    try {
      const [categories] = await pool.query(`
        SELECT * FROM categories
        ORDER BY name ASC
      `);
      
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
  
  /**
   * Create a new project
   * @param {Object} projectData - Project data
   * @returns {Promise<Object>} - Created project object
   */
  static async create(projectData) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Insert project
      const [result] = await connection.query(`
        INSERT INTO projects 
        (title, slug, description, long_description, image, category_id, client, year, completed_date, demo_url, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        projectData.title,
        projectData.slug,
        projectData.description,
        projectData.longDescription,
        projectData.image,
        projectData.categoryId,
        projectData.client,
        projectData.year,
        projectData.completedDate,
        projectData.demoUrl,
        projectData.featured || false
      ]);
      
      const projectId = result.insertId;
      
      // Add technologies
      if (projectData.technologies && projectData.technologies.length > 0) {
        for (const techId of projectData.technologies) {
          await connection.query(`
            INSERT INTO project_technologies (project_id, technology_id)
            VALUES (?, ?)
          `, [projectId, techId]);
        }
      }
      
      await connection.commit();
      
      // Get the created project
      return this.getBySlug(projectData.slug);
    } catch (error) {
      await connection.rollback();
      console.error('Error creating project:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = Project;