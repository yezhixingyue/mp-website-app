import Cors from 'cors'
import initMiddleware from '../../utils/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function handler(req, res) {
  console.log(req, 'req');
  // Run cors
  const res = await cors(req, res)
  console.log(res);
  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' })
}
