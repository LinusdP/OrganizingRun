export class NRCard {
  _id?: string;
  _rev?: string;
  advancement_cost?: number;
  agenda_points?: number;
  code: string;
  cost?: number;
  deck_limit: number;
  faction_code: string;
  faction_cost?; number;
  flavor?: string;
  illustrator: string;
  influence_limit?: number;
  keywords?: string;
  memory_cost?: number;
  minimum_deck_size?: number;
  pack_code: string;
  position: number;
  quantity: number;
  side_code: string;
  text: string;
  title: string;
  trash_cost?: number;
  type_code: string;
  strenght?: number;
  uniqueness: boolean;
}

/*DATA EXAMPLES
 COMMON - REQUIRED
"code": "00005",
"deck_limit": 1,
"faction_code": "neutral-corp",
"illustrator": "Sławomir Maniak",
"keywords": "Megacorp",
"pack_code": "draft",
"position": 5,
"quantity": 1,
"side_code": "corp",
"text": "Draft format only.\nYou can use agendas from all factions in this deck.",
"title": "The Shadow: Pulling the Strings",
"type_code": "identity",
"uniqueness": false

COMMON - OPTIONAL
"cost": 9,
"flavor": "The Past is the Future.",
"faction_cost": 2,

IDENTITY SPECIFIC
"influence_limit": null,
"minimum_deck_size": 30,

PROGRAM SPECIFIC
"memory_cost": 2,

AGENDA SPECIFIC
"advancement_cost": 3,
"agenda_points": 2,

ASSET/UPGRADE SPECIFIC
"trash_cost": 3,

ICE SPECIFIC
"strength": 6,

***/