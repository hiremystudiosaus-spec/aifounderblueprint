import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogsData } from '../data/blogsData';

function BlogPost() {
  const { slug } = useParams();
  const blog = blogsData.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="container" style={{ padding: '64px 0', textAlign: 'center', minHeight: '60vh' }}>
        <h1 className="h1-display">Blog Not Found</h1>
        <p style={{ marginTop: '24px' }}>
          <Link to="/blogs" style={{ color: 'var(--color-primary-accent)', textDecoration: 'none', fontWeight: 'bold' }}>Return to Blogs</Link>
        </p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', padding: '48px 0' }}>
      <Helmet>
        <title>{blog.title} - The AI Founder Blueprint</title>
        <meta name="description" content={blog.excerpt} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={`https://aifounderblueprint.com${blog.image}`} />
      </Helmet>
      
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link to="/blogs" style={{ display: 'inline-block', marginBottom: '24px', color: 'var(--color-primary-accent)', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Back to Blogs
        </Link>
        
        <img 
          src={blog.image} 
          alt={blog.title} 
          style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover', borderRadius: '24px', border: 'var(--border-thick)', boxShadow: '8px 8px 0px var(--color-primary-accent)', marginBottom: '32px' }} 
        />
        
        <div style={{ color: 'var(--color-primary-dark)', fontSize: '1rem', fontWeight: 'bold', marginBottom: '16px', opacity: 0.8 }}>
          {blog.date}
        </div>
        
        <h1 className="h1-display" style={{ marginBottom: '32px' }}>{blog.title}</h1>
        
        <div 
          className="blog-content" 
          style={{ fontSize: '1.125rem', lineHeight: '1.8' }}
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
      </div>
    </div>
  );
}

export default BlogPost;
