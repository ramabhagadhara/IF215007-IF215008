const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

// Lihat list buku
app.get('/kerja', (req, res) => {
  res.json([
    {
      job: "sales",
      minimalpendidikan: "S1",
    },
    {
        job: "manager",
        minimalpendidikan: "S2",
    }    
  ])
})

// Lihat detail buku
app.get('/kerja/:id', (req, res) => {
  res.json(
    {
        job: "sales",
        minimalpendidikan: "S1",
    }
  )
})

// Tambah buku
app.post('/kerja', (req, res) => {
  res.json(
    {
        id : 1,
        job: "sales",
        minimalpendidikan: "S1",
    }
  )
})

// Hapus buku
app.delete('/kerja/:id', (req, res) => {
  res.json(
    {
        id : 1,
        job: "sales",
        minimalpendidikan: "S1",
    }
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})