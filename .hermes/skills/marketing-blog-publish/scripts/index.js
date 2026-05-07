/**
 * Marketing Blog Publish - Scripts Package
 * 
 * Export tất cả các modules
 * 
 * Usage:
 *   const { publishBlog, templateParser, markdownConverter } = require('./scripts');
 */

const blogPublisher = require('./blog-publisher');
const templateParser = require('./template-parser');
const markdownConverter = require('./markdown-converter');

module.exports = {
  // Main function
  publishBlog: blogPublisher.publishBlog,
  
  // Individual modules
  templateParser,
  markdownConverter,
  
  // Utilities
  generateSlug: blogPublisher.generateSlug,
  prepareBlogData: blogPublisher.prepareBlogData
};
