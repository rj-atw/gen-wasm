FROM node AS babel
RUN mkdir -p /tmp/build
COPY package.json /tmp/build/.
COPY src/ /tmp/build/src/
COPY www /tmp/build/www
WORKDIR /tmp/build
RUN npm i
RUN npx babel src --out-dir www --presets react-app/prod

FROM nginx
COPY --from=babel /tmp/build/www/ /usr/share/nginx/html
RUN sed -i 's/var\/log/tmp/g' /etc/nginx/nginx.conf
RUN mkdir -p /tmp/nginx
