# Define the base image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Set environment variables
ENV ENV_VAR=example

# Expose a port
EXPOSE 8000

# Set the default command
CMD ["python", "app.py"]

# Add metadata labels
LABEL maintainer="Your Name <your.email@example.com>"
LABEL version="1.0"
LABEL description="My Dockerized App"

# Define a volume
VOLUME /data
