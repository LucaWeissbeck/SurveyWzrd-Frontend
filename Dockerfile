FROM nginx

COPY ./build /opt/

RUN chown -R www-data:www-data /opt/

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

