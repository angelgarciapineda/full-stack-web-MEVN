let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;


chai.use(chaiHttp);
const url = 'http://localhost:3000/api';



const app = require('../../src/routes/index.js');
const conn = require('../../src/database.js')

/* TEST POUR VALIDER QUAND UN UTILISATEUR EXISTE DEJA */
describe('POST /signup', () => {
    it('ERROR signup', (done) => {
        chai.request(url).post('/signup')
            .send({
                email: 'angel@gmail.com',
                displayName: 'Test',
                password: 'angel',
            })
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(500)
                done();
            })
    })
})

/* TEST POUR SE CONNECTER */
describe('POST /signin', () => {
    it('OK signin', (done) => {
        chai.request(url)
            .post('/signin')
            .send({
                email: 'angel@gmail.com',
                password: 'angel',
            })
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200)
                done();
            })
    })
})
/* TEST POUR VALIDER QUAND L'UTILISATEUR N'EXISTE PAS */
describe('POST /signin', () => {
    it('ERROR signin', (done) => {
        chai.request(url)
            .post('/signin')
            .send({
                email: "jenexistepas@gmail.com",
                password: "",
            })
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(404)
                done();
            })
    })
})
/* TEST POUR VALIDER QUAND LE MOT DE PASSE N'EST PAS BON*/
describe('POST /signin', () => {
    it('ERREUR signin ', (done) => {
        chai.request(url)
            .post('/signin')
            .send({
                email: "angel@gmail.com",
                password: "test",
            })
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(404)
                done();
            })
    })
})

/* TEST POUR MONTRER TOUS LES LOGEMENTS D'UN UTILISATEUR*/
describe('GET /homes', () => {
    let id="5f0316b4ee56a71ba0e2591a"
    it('ERREUR signin ', (done) => {
        chai.request(url)
            .get(`/home/${id}`)
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200)
                done();
            })
    })
})
