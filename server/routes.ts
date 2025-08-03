import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for generating shareable URLs
  app.get('/api/generate-url', (req, res) => {
    const { query } = req.query;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ 
        error: 'Query parameter is required' 
      });
    }

    const baseUrl = req.get('host') ? `${req.protocol}://${req.get('host')}` : 'http://localhost:5000';
    const shareableUrl = `${baseUrl}/?q=${encodeURIComponent(query)}`;
    
    res.json({ 
      url: shareableUrl,
      query: query.trim()
    });
  });

  // API route for redirecting to Perplexity
  app.get('/api/redirect', (req, res) => {
    const { query } = req.query;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ 
        error: 'Query parameter is required' 
      });
    }

    const perplexityUrl = `https://www.perplexity.ai/?q=${encodeURIComponent(query)}`;
    
    res.json({ 
      redirectUrl: perplexityUrl,
      query: query.trim()
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
