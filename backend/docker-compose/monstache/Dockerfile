FROM rwynn/monstache:latest

COPY config-dev.toml /config.toml
COPY startup.sh /startup.sh
RUN chmod +x /startup.sh


ENTRYPOINT [ "/bin/sh", "/startup.sh" ]