# 4C Research Lab RAG Chatbot API

This is the FastAPI backend for the 4C Research Lab chatbot that uses RAG (Retrieval-Augmented Generation) with Google Gemini.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set up Environment Variables

Create a `.env` file in the `chatbot-4c` directory:

```env
GOOGLE_API_KEY=your_google_api_key_here
```

### 3. Start the API Server

```bash
python start_api.py
```

The API will be available at:

- **API Base URL**: http://localhost:8000
- **Health Check**: http://localhost:8000/health
- **API Documentation**: http://localhost:8000/docs

## ⚡ Vector Store Caching

The system now **saves and reuses** the vector store for faster startup:

### **First Run (Slow)**

- Creates embeddings from FAQ data
- Saves vector store to `vector_store/` directory
- Takes 30-60 seconds

### **Subsequent Runs (Fast)**

- Loads cached vector store from disk
- Starts in 5-10 seconds
- No need to recreate embeddings

### **Managing the Vector Store**

#### Check Status

```bash
python manage_vectorstore.py status
```

#### Rebuild Vector Store (when FAQ data changes)

```bash
python manage_vectorstore.py rebuild
```

#### Wait for API to be Ready

```bash
python manage_vectorstore.py wait
```

## 🔧 API Endpoints

### POST /chat

Send a message to the chatbot.

**Request:**

```json
{
  "message": "What is the 4C Research Lab?",
  "chat_history": []
}
```

**Response:**

```json
{
  "response": "The 4C Research Lab (Cognition, Consciousness, and Critical Care Research Group) is...",
  "sources": ["source1", "source2"]
}
```

### GET /health

Check if the RAG system is ready.

### GET /

Basic API information.

### POST /rebuild-vectorstore

Force rebuild the vector store (useful when FAQ data changes).

## 🌐 Integration with Next.js Website

The Next.js website is configured to call this API at `http://localhost:8000/chat`.

To change the API URL, set the `RAG_API_URL` environment variable in your Next.js `.env.local`:

```env
RAG_API_URL=http://localhost:8000
```

## 🐛 Troubleshooting

### Common Issues:

1. **"GOOGLE_API_KEY not found"**
   - Make sure your `.env` file contains the Google API key
   - Get a key from: https://makersuite.google.com/app/apikey

2. **"RAG system not initialized"**
   - Wait a few seconds for the system to load
   - Check the console for initialization errors

3. **"Module not found" errors**
   - Run `pip install -r requirements.txt`
   - Make sure you're in the `chatbot-4c` directory

4. **Port 8000 already in use**
   - Change the port in `start_api.py` or `api.py`
   - Update `RAG_API_URL` in your Next.js environment

5. **Vector store issues**
   - Delete `vector_store/` directory to force rebuild
   - Use `python manage_vectorstore.py rebuild` to rebuild

## 📊 Monitoring

- Check `/health` endpoint for system status
- Monitor console logs for initialization progress
- API docs available at `/docs` (Swagger UI)
- Use `python manage_vectorstore.py status` for quick status check

## 🔄 Development

The API includes:

- Auto-reload on code changes
- CORS enabled for local development
- Error handling with fallback responses
- Source document tracking
- **Vector store caching for faster startup**

## 🚀 Production Deployment

For production, consider:

- Using a process manager (PM2, Supervisor)
- Setting up proper CORS origins
- Using environment variables for configuration
- Adding rate limiting
- Setting up monitoring and logging
- **Pre-building vector store during deployment**

## 📁 File Structure

```
chatbot-4c/
├── api.py                    # Main FastAPI application
├── start_api.py             # Startup script
├── manage_vectorstore.py    # Vector store management
├── requirements.txt         # Python dependencies
├── data/
│   └── 4c_research_lab_faqs.csv  # FAQ data
├── vector_store/            # Cached embeddings (auto-created)
└── .env                     # Environment variables
```

## ⚡ Performance Tips

1. **First startup**: Be patient (30-60 seconds for embedding creation)
2. **Subsequent startups**: Should be much faster (5-10 seconds)
3. **Update FAQ data**: Use `python manage_vectorstore.py rebuild`
4. **Monitor memory**: Vector store uses ~50-100MB RAM
5. **Scale horizontally**: Multiple API instances can share the same vector store
