FROM nginx:mainline

COPY [ "./.pipeline/default.conf", "/etc/nginx/conf.d/default.conf" ]

RUN rm -rf /usr/share/nginx/html

COPY [ "./build", "/usr/share/nginx/html" ]

WORKDIR /usr/share/nginx/html
