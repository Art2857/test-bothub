import depfy from "depfy";

import { envRead } from "./resource.env";

export default depfy.injectable({
  factory: async () => {
    const env = envRead();
    return env;
  },
});
