class HttpError extends Error{
    constructor(status,message,data=null){
        this.status=status;
        this.message=message;
        this.data=data;
    }
}
module.exports=HttpError;