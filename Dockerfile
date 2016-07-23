FROM urbanmassage/node:6-slim

COPY . /usr/src/flight-control
WORKDIR /usr/src/flight-control

CMD ["node", "."]
