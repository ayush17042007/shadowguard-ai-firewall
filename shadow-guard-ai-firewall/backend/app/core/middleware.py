import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from app.utils.logger import logger

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        try:
            response = await call_next(request)
            process_time = time.time() - start_time
            logger.info(f"{request.method} {request.url.path} - {response.status_code} - {process_time:.4f}s")
            return response
        except Exception as e:
            process_time = time.time() - start_time
            logger.error(f"{request.method} {request.url.path} - ERROR: {str(e)} - {process_time:.4f}s")
            raise
