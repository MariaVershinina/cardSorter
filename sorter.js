class Cards {
	constructor(){
		this.cards = [];
		this.description = [];
	}
	/*
	Данная функция формирует словесное описание путешествия.
	Формат входных данных:

	Object{
		{ 
			"departure": { (пункт отправления) 
				"name": "название города, вокзала, аэропорта",
				"location": {координаты} - опционально
			},
			"destination": { (пункт прибытия) 
				"name": "название города, вокзала, аэропорта",
				"location": {координаты} - опционально
			},
			"transport": "тип транспорта",
			"transport_info": { (информация о транспорте) отличается для разных типов транспорта
				"flight": "SK455",
			"gate": "45B",
			"seat": "3A",
			"baggage_drop": "344",
			"notes": "Baggage drop at ticket counter 344."  доп. информация
			}
	}
	*/
	createTravelDescription(mixedCards){
		return new Promise((resolve, reject) => {
			try{ 
				this.cards = mixedCards;
			}	catch(err) {
				reject(err.toString());
			}
			this.sort();

				/*Формирование информации в зависимости от типа транспорта*/
		this.cards.forEach(card => {
			let tripInfo = "";
			switch(card.transport){
	  	  case 'train':
	       	tripInfo = `Take train ${card.transport_info.route} from ${card.departure.name} to ${card.destination.name}. Seat: ${card.transport_info.seat}.${card.transport_info.notes}`;
	      break;
	  	  case 'airport bus':
	  	    tripInfo =`Take the airport bus from ${card.departure.name} to ${card.destination.name}. Seat: ${card.transport_info.seat}.${card.transport_info.notes}`;
	      break;
	  		case 'plane':
	  			tripInfo =`From ${card.departure.name}, take flight ${card.transport_info.flight} to ${card.destination.name}. Gate: ${card.transport_info.gate}. Seat: ${card.transport_info.seat}.${card.transport_info.notes}`;
	      break;
	  	}
			this.description.push(tripInfo);
		});
		resolve(this.description);
		});
	}

 	/* Сортировка */
	sort() {
		let index;
		for (let i = 0; i < this.cards.length; i++) {
			let startFlag = true;
			for (let j = 0; j < this.cards.length; j++) {
				if (this.cards[i].departure.name === this.cards[j].destination.name) {
					this.cards[i].prev = j;
					this.cards[j].next = i;
					startFlag = false;
					break;
				}
			}
			if (startFlag) {
				index = i;
			}
		}

		let buffer = [];
		while (buffer.length !== this.cards.length) {
			let elem = {};
			Object.assign(elem, this.cards[index]);
			delete elem.prev;
			delete elem.next;
			buffer.push(elem);
			index = this.cards[index].next;
		}

		this.cards = buffer;
	}

}
