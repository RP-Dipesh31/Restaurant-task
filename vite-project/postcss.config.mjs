// export default {
//     plugins: {
//       "@tailwindcss/postcss": {},
//       "autoprefixer": {},
//     }
//   }

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [tailwindcss("./tailwind.config.cjs"), autoprefixer],
};
