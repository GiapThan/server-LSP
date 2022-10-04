
import {createClient} from 'redis'

const client = createClient({
    username: 'ng-free-db',
    password: 'JOyYmFBc4yDWg8vmBVayZbh89jqOYr1R',
   
})

client.on('error', (err) => {
    console.log('Redis Client Error', err)
})

export default connect = async () => {
    try { 
        let result = await client.connect()
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}
