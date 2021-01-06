export default (req, res) => {
  console.log(req, '---------------req');
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
