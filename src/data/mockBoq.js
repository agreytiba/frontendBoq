import React from 'react';

export const mockPreliminaries = {
	id: 1,
	createdAt: '22/07/2023',
	lastDate: '2/09/2023',
	mapName: 'mp12',
	name: 'agrey',
	area: 'kimbiji kisaraswe II',
	stage: 'preliminaries',
	items: [
		{
			id: 1,
			materialName: 'timber 2 X 2',
			unit: 'Pcs',
			quantity: 40,
			rate: 40000
		},
		{
			id: 2,
			materialName: 'manila',
			unit: 'Pcs',
			quantity: 1,
			rate: 1000
		},
		{
			id: 3,
			materialName: 'timber nails',
			unit: 'kg',
			quantity: 3,
			rate: 3500
		}
	]
};

export const collectivePurchases = [
	{   id: "1",
		material: "tofali",
		rate: 900,
		unit: "moja",
		payBefore: "04/07/2023",
		placeDelivered: "ubungo,luis",
		deliveryRange:"1 may - 30 may 2023",
		transport: "free",
		orderStatus: "tunaendelea kupokea",
	    usersAcceptOffer:[ "agreyId", "anithaId"]
		
	},
	{   id: "2",
		material: "cement",
		unit: "mfuko",
		rate: 13000,
		payBefore: "04/08/2023",
		placeDelivered: "kibaha, milemoja",
		deliveryRange:"1 may - 30 may 2023",
		transport: "free",
		orderStatus: "tunaendelea kupokea",
	    usersAcceptOffer:[ "agreyId", "anithaId"]
		
	},
]
export const products = [
	{
		id: 1,
		materialName: 'timber 2 X 2',
		unit: 'Pc',
		rate: 40000
	},
	{
		id: 2,
		materialName: 'manila',
		unit: 'Pc',
		rate: 1000
	},
	{
		id: 3,
		materialName: 'timber nails',
		unit: 'kg',
		rate: 3500
	}
];
export const serviceProviders = [
	{
		id: 1,
		name: 'peter john',
		region: 'mbeya',
		district: "mbeya mjini",
		ward: "kweke",
		status:"hajasajiliwa"
	},
	{
		id: 2,
		name: 'mweem joseph',
		region: 'dar es salaam',
		district: "ubungo",
		ward: "luis",
		status:" kasajiliwa"
	},
	{
		id: 3,
		name: 'tuvester mwenda',
		region: 'kigoma',
		district: "ujiji",
		ward: "gengeko",
		status: "inahakikiwa"
	}
];
export const mapsdetails = [
	{
		id: 1,
		mapNo: 'mbezi-001',
		uploadedDate:"22/07/2023"
		
	},
	{
		id: 2,
		mapNo: 'ilemela-003',
		uploadedDate:"21/06/2023"
	},
	{
		id: 3,
		mapNo: 'kino-12',
		uploadedDate:"03/04/2023"
	}
];
