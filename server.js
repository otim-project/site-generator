const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const testData = {
    // "/": {
    //     "page": "/index",
    //     "query": {
    //         "nodes": [
    //             {
    //                 "key": "toen-mastercourse",
    //                 "repo": "jakebian/OTIM-toen-mastercourse"
    //             }
    //         ],
    //         "contentMap": {
    //             "toen-mastercourse": [
    //                 {
    //                     "title": "Lecture 1: Reflections on the notion of Space I",
    //                     "path": "/chapters/lecture1.tex"
    //                 },
    //                 {
    //                     "title": "Lecture 2: Reflections on the notion of Space II",
    //                     "sub": [
    //                         {
    //                             "title": "1. Geometric contexts"
    //                         },
    //                         {
    //                             "title": "2. Manifolds"
    //                         },
    //                         {
    //                             "title": "3. Geometric spaces",
    //                             "path": "/chapters/lecture2-3.tex"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "title": "Lecture 3: Schemes and algebraic spaces I"
    //                 },
    //                 {
    //                     "title": "Lecture 4: Schemes and algebraic spaces II"
    //                 },
    //                 {
    //                     "title": "Lecture 5: Stacks I"
    //                 },
    //                 {
    //                     "title": "Lecture 6: Stacks II"
    //                 },
    //                 {
    //                     "title": "Lecture 7: Stacks III"
    //                 },
    //                 {
    //                     "title": "Lecture 8: Stacks IV"
    //                 },
    //                 {
    //                     "title": "Some exercises"
    //                 }
    //             ]
    //         },
    //         "metaMap": {
    //             "toen-mastercourse": {
    //                 "title": "A master course on algebraic stacks",
    //                 "author": "Bertrand Toën",
    //                 "date": 2005
    //             }
    //         }
    //     }
    // },
    // "/node/toen-mastercourse": {
    //     "page": "/nodePage",
    //     "query": {
    //         "config": {
    //             "key": "toen-mastercourse",
    //             "repo": "jakebian/OTIM-toen-mastercourse"
    //         },
    //         "content": [
    //             {
    //                 "title": "Lecture 1: Reflections on the notion of Space I",
    //                 "path": "/chapters/lecture1.tex"
    //             },
    //             {
    //                 "title": "Lecture 2: Reflections on the notion of Space II",
    //                 "sub": [
    //                     {
    //                         "title": "1. Geometric contexts"
    //                     },
    //                     {
    //                         "title": "2. Manifolds"
    //                     },
    //                     {
    //                         "title": "3. Geometric spaces",
    //                         "path": "/chapters/lecture2-3.tex"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "title": "Lecture 3: Schemes and algebraic spaces I"
    //             },
    //             {
    //                 "title": "Lecture 4: Schemes and algebraic spaces II"
    //             },
    //             {
    //                 "title": "Lecture 5: Stacks I"
    //             },
    //             {
    //                 "title": "Lecture 6: Stacks II"
    //             },
    //             {
    //                 "title": "Lecture 7: Stacks III"
    //             },
    //             {
    //                 "title": "Lecture 8: Stacks IV"
    //             },
    //             {
    //                 "title": "Some exercises"
    //             }
    //         ],
    //         "meta": {
    //             "title": "A master course on algebraic stacks",
    //             "author": "Bertrand Toën",
    //             "date": 2005
    //         },
    //         "staticDir": {
    //             "/chapters/lecture1.tex": "toen-mastercourse/chapters/lecture1.pdf",
    //             "/chapters/lecture2-3.tex": "toen-mastercourse/chapters/lecture2-3.pdf"
    //         }
    //     }
    // }
};

app.prepare()
.then(() => {
  const server = express()

  Object.keys(testData).forEach(
    pageId => server.get(`${pageId}`, (req, res) => {
      app.render(req, res, testData[pageId].page, testData[pageId].query)
    })

  )

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})