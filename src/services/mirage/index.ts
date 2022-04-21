import { createServer, Factory, Model, ActiveModelSerializer, Response} from "miragejs";
import { faker } from "@faker-js/faker";

type User = {
  name: string;
  course: string;
  period: string;
  phone: string;
  email: string;
  avatar: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name() {
          return `${faker.name.firstName()} ${faker.name.lastName()}`;
        },
        course() {
          return faker.name.jobType();
        },
        period() {
          return faker.datatype.number({ min: 1, max: 11 });
        },
        phone() {
          return faker.phone.phoneNumber("+55 27 # ####-####");
        },
        email() {
          return faker.internet.email().toLocaleLowerCase();
        },
        avatar() {
          return faker.internet.avatar();
        }
      }),
    },

    seeds(server) {
      server.createList("user", 200);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/users");

      this.get("/users/:id");
      this.post("/users");

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
