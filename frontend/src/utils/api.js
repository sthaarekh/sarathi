    import axios from 'axios'

    const api=axios.create({baseURL:"http://localhost:5000/api/v1/admin/"})

    export const getAllClubs=()=>api.get("/clubs")
    export const DeleteAClub=(id)=>api.delete(`/clubs/${id}`)
    export const getllAllQuestions=(id)=>api.get(`/clubs/${id}/questions`)
    export const verifyClub=(id)=>api.patch(`/clubs/${id}`)
    export const deleteQuestionsForAClub=(id)=>api.delete(`clubs/${id}/questions`)
    