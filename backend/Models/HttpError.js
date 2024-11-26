class HttpError extends Error{
    constructor(status,message,data=null){
        super(message)
        this.status=status;
        this.data=data;
    }
}
module.exports=HttpError;