import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from '../components/Card';
import { blogsData } from '../data/blogsData';
import '../index.css';

function Blogs() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogsData.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', padding: '48px 0' }}>
      <Helmet>
        <title>Blogs - The AI Founder Blueprint</title>
        <meta name="description" content="Read our latest blogs on building AI products and launching your tech career." />
      </Helmet>
      
      <div className="container">
        <h1 className="h1-display text-center" style={{ marginBottom: '32px' }}>Our Blogs</h1>
        
        <div style={{ maxWidth: '600px', margin: '0 auto 48px' }}>
          <input 
            type="text" 
            placeholder="Search blogs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '16px 24px', 
              fontSize: '1.125rem', 
              borderRadius: '999px', 
              border: '2px solid var(--color-primary-dark)',
              outline: 'none'
            }}
          />
        </div>

        <div className="grid-3">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <Link to={`/blog/${blog.slug}`} key={blog.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card style={{ backgroundColor: 'var(--color-secondary-light)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px', border: 'var(--border-thick)' }} 
                  />
                  <div style={{ color: 'var(--color-primary-accent)', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '8px' }}>
                    {blog.date}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>{blog.title}</h3>
                  <p style={{ fontSize: '1rem', opacity: 0.8, flexGrow: 1 }}>{blog.excerpt}</p>
                </Card>
              </Link>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.25rem' }}>
              No blogs found for "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
