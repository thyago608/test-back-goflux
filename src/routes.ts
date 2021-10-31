import express from 'express';

const routes = express.Router();

routes.get('/', (request, response) => {

  response.status(200).json({message:"Method GET running"});
});

routes.post('/create',(request, response)=>{

  response.status(200).json({message: "Method POST Running"});
});


export default routes;


/*

    {
    "id": 1,
    "name": "goFlux Brasil",
    "doc": "60.429.484/0001-10",
    "about": "goFlux, uma empresa especializada em inovar na contratação de fretes",
    "active": true,
    "site": "https://goflux.com.br/"
}


*/
