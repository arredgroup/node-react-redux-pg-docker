import http from '../http-service';

class PostDataService {
    getAll(){
        return http.get('/post/all');
    }

    insert(data){
        return http.post("/post/create", data);
    }

    delete(id){
        return http.delete(`/post/delete/${id}`);
    }
}

export default new PostDataService();