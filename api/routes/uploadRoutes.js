import express from 'express'
import path from 'path'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`)
  },
})

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = mimetypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error('Images only!'), false)
  }
}

const upload = multer({ storage, fileFilter })
const uploadImages = upload.array('image')

router.post('/', (req, res) => {
  uploadImages(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message })
    }

    let links = []
    const files = req.files

    files.forEach((file) => {
      links.push(file.filename)
    })

    res.status(200).send({
      message: 'Images uploaded successfully',
      links,
    })
  })
})

export default router
