FROM nginx
ADD public /usr/share/nginx/html
RUN rm etc/nginx/conf.d/default.conf
# Overload nginx.conf to enable cors
COPY nginx.conf etc/nginx/conf.d/

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
