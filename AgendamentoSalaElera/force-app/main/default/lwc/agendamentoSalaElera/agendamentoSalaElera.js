import { LightningElement, track } from 'lwc';

export default class AgendamentoSalaElera extends LightningElement {
    @track salas = [
        {
            Id: 'LADMKASA01',
            Name: 'Apex',
            reunioesMarcadas: [
                {
                    Id: 1,
                    Sala: 'LADMKASA01',
                    HoraInicio: '09:00',
                    HoraFim: '10:00'
                },
            
                {
                    Id: 2,
                    Sala: 'LADMKASA01',
                    HoraInicio: '10:00',
                    HoraFim: '11:00'
                }
            ],
            ocupada: false
        },
            
        {
            Id: 'LADMKASA02',
            Name: 'Lightning'
        },
        {
            Id: 'LADMKASA03',
            Name: 'Aura'
        },
        {
            Id: 'LADMKASA04',
            Name: 'Er.cic'
        },
        {
            Id: 'LADMKASA05',
            Name: 'Orizonta'
        },
        {
            Id: 'LADMKASA07',
            Name: '7B'
        }
    ];

    @track hours = [];

    connectedCallback() {
        this.loadHours();
    }

    loadHours() {   
        let hour = 9;
        let minutes = 0;

        while (hour <= 18) {
            this.hours.push(`${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);

            minutes += 30;

            if (minutes === 60) {
                minutes = 0;
                hour += 1;
            }
        }   
    }

    agendaOcupada(){
        
        let salaId = event.target.dataset.hour;
        let hora = event.target.dataset.hour;
        return this.reunioesMarcadas.some(reuniao =>
            reuniao.Sala === salaId &&
            reuniao.HoraInicio && hora < reuniao.HoraFim
        )
    }
}
