import { LightningElement, track } from 'lwc';

export default class AgendamentoSalaElera extends LightningElement {
    salas = [
        {
            Id: 'LADMKASA01',
            Name: 'Apex',
            reunioesMarcadas: [
                {
                    Id: 1,
                    SalaId: 'LADMKASA01',
                    HoraInicio: '09:00',
                    HoraFim: '10:00',
                    data: '2024-07-11',
                    Nome: 'Alinhamento P&P'
                },
                {
                    Id: 2,
                    SalaId: 'LADMKASA01',
                    data: '2024-07-20',
                    HoraInicio: '10:00',
                    HoraFim: '13:00',
                    Nome: "Daily Pacaembu"
                }
            ],
        },
        {
            Id: 'LADMKASA02',
            Name: 'Lightning',
            reunioesMarcadas: [
                {
                    Id: 3,
                    SalaId: 'LADMKASA02',
                    HoraInicio: '15:00',
                    HoraFim: '17:00',
                    Nome: "Homologação"
                }
            ]
        },
        {
            Id: 'LADMKASA03',
            Name: 'Aura',
            reunioesMarcadas: []
        },
        {
            Id: 'LADMKASA04',
            Name: 'Er.cic',
            reunioesMarcadas: []
        },
        {
            Id: 'LADMKASA05',
            Name: 'Orizonta',
            reunioesMarcadas: []
        },
        {
            Id: 'LADMKASA07',
            Name: '7B',
            reunioesMarcadas: []
        }
    ]

    hours = []
    data = ''

    connectedCallback() {
        this.loadHours()
        this.loadData()
    }

    renderedCallback(){
        this.checarOcupacao();
        this.redirecionarHorario()
    }

    loadHours() {   
        let hour = 9
        let minutes = 0

        while (hour <= 22 && minutes <= 30) {
            this.hours.push(`${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)

            minutes += 30

            if (minutes === 60) {
                minutes = 0
                hour += 1
            }
        }   
    }

    checarOcupacao() {
        const celulas = this.template.querySelectorAll('.cll')

        celulas.forEach(cell => {
            const salaId = cell.dataset.salaId
            const hour = cell.dataset.hour
            let titulo = ""

            let reunioesMarcadas = this.getReunioesMarcadas(salaId)
            let ocupada = false

            reunioesMarcadas.forEach(reuniao => {
                if (reuniao.SalaId === salaId && hour >= reuniao.HoraInicio && hour < reuniao.HoraFim && reuniao.data === this.data) {
                    ocupada = true

                    if (hour >= reuniao.HoraInicio || reuniao.HoraFim <= hour) {
                        titulo = reuniao.Nome
                    }
                }
            });

            if (ocupada) {
                cell.classList.add('ocupada')
                cell.classList.remove('disponivel')
                cell.innerHTML = `${titulo}`
            } else {
                cell.classList.add('disponivel')
                cell.classList.remove('ocupada')
                cell.innerHTML = ""
            }
        });
    }

    loadData(){
        const date = new Date()
        const ano = date.getFullYear()
        const mes = String(date.getMonth() + 1).padStart(2, '0')
        const dia = String(date.getDate()).padStart(2, '0')
        this.data = `${ano}-${mes}-${dia}`
    }

    redirecionarHorario() {
        const dataEntry = new Date()
        const userMinutes = dataEntry.getMinutes()
        let userHour
    
        if (userMinutes > 30) {
            userHour = `${String(dataEntry.getHours()).padStart(2, '0')}:30`
        } else {
            userHour = `${String(dataEntry.getHours()).padStart(2, '0')}:00`
        }
    
        let indiceHorarioAtual = -1
    
        this.hours.forEach((horario, i) => {
            if (horario === userHour) {
                indiceHorarioAtual = i
            }
        })
    
        if (indiceHorarioAtual !== -1) {
            const celulas = this.template.querySelectorAll(`.cll[data-hour="${this.hours[indiceHorarioAtual]}"]`)
    
            if (celulas.length > 0) {
                celulas[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start'
                })
            }
        }
    }
    
    getReunioesMarcadas(salaId){
        return this.salas.find(sala => 
            sala.Id === salaId
            ).reunioesMarcadas
    }

    handleDateChange(event) {
        this.data = event.target.value
    }
}
