import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";
import * as checkmate from "@tetratelabs/pulumi-checkmate";

const pet1 = new random.RandomPet("pet1");
const pet2 = new random.RandomPet("pet2");

export const pets = {
  pet1: pet1.id,
  pet2: pet2.id,
};

const url = pulumi.interpolate`https://httpbin.org/get?pet1=${pet1.id}&pet2=${pet2.id}`;

export const something = new checkmate.HttpHealth("check-endpoint", {
  timeout: 1000 * 60,
  interval: 1000,
  consecutiveSuccesses: 1,
  url,
}).id;
