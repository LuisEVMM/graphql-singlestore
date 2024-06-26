FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
ENTRYPOINT ["npm", "run"]
CMD ["start"]
