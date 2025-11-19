# LLM Meter Backend

NestJS backend API for LLM Meter - Track and monitor your LLM usage, costs, and performance across multiple providers (OpenAI, Anthropic, Ollama, etc.).

## Features

- RESTful API for tracking LLM usage
- WebSocket support for real-time updates
- Analytics and statistics endpoints
- Model pricing management
- SQLite database for data persistence
- Real-time dashboard integration

## Installation

```bash
npm install llm-meter-backend
```

Or clone and run locally:

```bash
git clone https://github.com/YOUR_USERNAME/llm-meter-backend.git
cd llm-meter-backend
npm install
npm run build
npm start
```

## Usage

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_PATH=./data/llm-meter.db

# CORS
CORS_ORIGIN=http://localhost:3000

# WebSocket
WS_PORT=3002
```

### Running the Backend

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start

# Run database migrations
npm run db:migrate
```

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/analytics/stats` - Get usage statistics
- `GET /api/analytics/functions` - Get function-specific analytics
- `GET /api/tracking/requests` - Get detailed usage requests
- `GET /api/tracking/request/:id` - Get specific request details
- `GET /api/pricing` - Get model pricing information
- `POST /api/tracking/track` - Track new usage events

## Database

The backend uses SQLite by default for data persistence. The database file is created automatically at the path specified in `DATABASE_PATH`.

## Integration

Use with the LLM Meter CLI or SDK to track and monitor your LLM usage:

```bash
llm-meter serve  # Starts this backend server
```

## Configuration

The backend can be configured through environment variables. See `.env.example` for all available options.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

MIT