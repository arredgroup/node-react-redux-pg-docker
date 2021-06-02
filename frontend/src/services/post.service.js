import http from '../http-service';

class PostDataService {
    getAll(){
        return http.get('/post/all');
    }

    insert(data){
        return http.post("/post/create", data);
    }

    delete(data){
        return http.post("/post/delete/", data);
    }
}

export default new PostDataService();