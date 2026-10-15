// Generated file based on package_var_deferred_table.go
// Updated when compliance tests are re-run, DO NOT EDIT!

import * as $ from "@goscript/builtin/index.js"

export class Symbol {
	public get Name(): string {
		return this._fields.Name
	}

	public set Name(value: string) {
		this._fields.Name = value
	}

	public get Kind(): number {
		return this._fields.Kind
	}

	public set Kind(value: number) {
		this._fields.Kind = value
	}

	public _fields: {
		Name: string
		Kind: number
	}

	constructor(init?: Partial<{Name?: string, Kind?: number}>, __goscriptValue?: boolean) {
		this._fields = {
			Name: init?.Name ?? ("" as string),
			Kind: init?.Kind ?? (0 as number)
		}
		;(this as any)[$.structValueMarker] = __goscriptValue === true
	}

	public clone(): Symbol {
		return new Symbol(this, true)
	}

	public __goscriptAssign(source: Symbol): void {
		const target = this._fields
		const values = source._fields
		target.Name = values.Name
		target.Kind = values.Kind
	}

	static __typeInfo = $.registerStructType(
		"main.Symbol",
		() => new Symbol(),
		() => [],
		Symbol,
		() => [{ name: "Name", key: "Name", type: /* @__PURE__ */ $.basicType("string") }, { name: "Kind", key: "Kind", type: /* @__PURE__ */ $.basicType("int") }]
	)
}

export var Numbers: $.Slice<number>

export function __goscript_init_Numbers(): void {
	if (((Numbers) as any) === undefined) {
		Numbers = $.arrayToSlice<number>([0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 123, 126, 129, 132, 135, 138, 141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171, 174, 177, 180, 183, 186, 189, 192, 195, 198, 201, 204, 207, 210, 213, 216, 219, 222, 225, 228, 231, 234, 237, 240, 243, 246, 249, 252, 255, 258, 261, 264, 267, 270, 273, 276, 279, 282, 285, 288, 291, 294, 297, 300, 303, 306, 309, 312, 315, 318, 321, 324, 327, 330, 333, 336, 339, 342, 345, 348, 351, 354, 357, 360, 363, 366, 369, 372, 375, 378, 381, 384, 387, 390, 393, 396, 399, 402, 405, 408, 411, 414, 417, 420, 423, 426, 429, 432, 435, 438, 441, 444, 447, 450, 453, 456, 459, 462, 465, 468, 471, 474, 477, 480, 483, 486, 489, 492, 495, 498, 501, 504, 507, 510, 513, 516, 519, 522, 525, 528, 531, 534, 537, 540, 543, 546, 549, 552, 555, 558, 561, 564, 567, 570, 573, 576, 579, 582, 585, 588, 591, 594, 597, 600, 603, 606, 609, 612, 615, 618, 621, 624, 627, 630, 633, 636, 639, 642, 645, 648, 651, 654, 657, 660, 663, 666, 669, 672, 675, 678, 681, 684, 687, 690, 693, 696, 699, 702, 705, 708, 711, 714, 717, 720, 723, 726, 729, 732, 735, 738, 741, 744, 747, 750, 753, 756, 759, 762, 765, 768, 771, 774, 777, 780, 783, 786, 789, 792, 795, 798, 801, 804, 807, 810, 813, 816, 819, 822, 825, 828, 831, 834, 837, 840, 843, 846, 849, 852, 855, 858, 861, 864, 867, 870, 873, 876, 879, 882, 885, 888, 891, 894, 897])
	}
}

export function __goscript_get_Numbers(): $.Slice<number> {
	if (((Numbers) as any) === undefined) {
		__goscript_init_Numbers()
	}
	return Numbers
}

export function __goscript_set_Numbers(__goscriptValue: $.Slice<number>): void {
	Numbers = __goscriptValue
}

export var Symbols: $.Slice<Symbol | $.VarRef<Symbol> | null>

export function __goscript_init_Symbols(): void {
	if (((Symbols) as any) === undefined) {
		Symbols = $.arrayToSlice<Symbol | $.VarRef<Symbol> | null>([new Symbol({Name: "s0", Kind: 0}), new Symbol({Name: "s1", Kind: 1}), new Symbol({Name: "s2", Kind: 2}), new Symbol({Name: "s3", Kind: 3}), new Symbol({Name: "s4", Kind: 4}), new Symbol({Name: "s5", Kind: 5}), new Symbol({Name: "s6", Kind: 6}), new Symbol({Name: "s7", Kind: 0}), new Symbol({Name: "s8", Kind: 1}), new Symbol({Name: "s9", Kind: 2}), new Symbol({Name: "s10", Kind: 3}), new Symbol({Name: "s11", Kind: 4}), new Symbol({Name: "s12", Kind: 5}), new Symbol({Name: "s13", Kind: 6}), new Symbol({Name: "s14", Kind: 0}), new Symbol({Name: "s15", Kind: 1}), new Symbol({Name: "s16", Kind: 2}), new Symbol({Name: "s17", Kind: 3}), new Symbol({Name: "s18", Kind: 4}), new Symbol({Name: "s19", Kind: 5}), new Symbol({Name: "s20", Kind: 6}), new Symbol({Name: "s21", Kind: 0}), new Symbol({Name: "s22", Kind: 1}), new Symbol({Name: "s23", Kind: 2}), new Symbol({Name: "s24", Kind: 3}), new Symbol({Name: "s25", Kind: 4}), new Symbol({Name: "s26", Kind: 5}), new Symbol({Name: "s27", Kind: 6}), new Symbol({Name: "s28", Kind: 0}), new Symbol({Name: "s29", Kind: 1}), new Symbol({Name: "s30", Kind: 2}), new Symbol({Name: "s31", Kind: 3}), new Symbol({Name: "s32", Kind: 4}), new Symbol({Name: "s33", Kind: 5}), new Symbol({Name: "s34", Kind: 6}), new Symbol({Name: "s35", Kind: 0}), new Symbol({Name: "s36", Kind: 1}), new Symbol({Name: "s37", Kind: 2}), new Symbol({Name: "s38", Kind: 3}), new Symbol({Name: "s39", Kind: 4}), new Symbol({Name: "s40", Kind: 5}), new Symbol({Name: "s41", Kind: 6}), new Symbol({Name: "s42", Kind: 0}), new Symbol({Name: "s43", Kind: 1}), new Symbol({Name: "s44", Kind: 2}), new Symbol({Name: "s45", Kind: 3}), new Symbol({Name: "s46", Kind: 4}), new Symbol({Name: "s47", Kind: 5}), new Symbol({Name: "s48", Kind: 6}), new Symbol({Name: "s49", Kind: 0}), new Symbol({Name: "s50", Kind: 1}), new Symbol({Name: "s51", Kind: 2}), new Symbol({Name: "s52", Kind: 3}), new Symbol({Name: "s53", Kind: 4}), new Symbol({Name: "s54", Kind: 5}), new Symbol({Name: "s55", Kind: 6}), new Symbol({Name: "s56", Kind: 0}), new Symbol({Name: "s57", Kind: 1}), new Symbol({Name: "s58", Kind: 2}), new Symbol({Name: "s59", Kind: 3}), new Symbol({Name: "s60", Kind: 4}), new Symbol({Name: "s61", Kind: 5}), new Symbol({Name: "s62", Kind: 6}), new Symbol({Name: "s63", Kind: 0}), new Symbol({Name: "s64", Kind: 1}), new Symbol({Name: "s65", Kind: 2}), new Symbol({Name: "s66", Kind: 3}), new Symbol({Name: "s67", Kind: 4}), new Symbol({Name: "s68", Kind: 5}), new Symbol({Name: "s69", Kind: 6}), new Symbol({Name: "s70", Kind: 0}), new Symbol({Name: "s71", Kind: 1}), new Symbol({Name: "s72", Kind: 2}), new Symbol({Name: "s73", Kind: 3}), new Symbol({Name: "s74", Kind: 4}), new Symbol({Name: "s75", Kind: 5}), new Symbol({Name: "s76", Kind: 6}), new Symbol({Name: "s77", Kind: 0}), new Symbol({Name: "s78", Kind: 1}), new Symbol({Name: "s79", Kind: 2}), new Symbol({Name: "s80", Kind: 3}), new Symbol({Name: "s81", Kind: 4}), new Symbol({Name: "s82", Kind: 5}), new Symbol({Name: "s83", Kind: 6}), new Symbol({Name: "s84", Kind: 0}), new Symbol({Name: "s85", Kind: 1}), new Symbol({Name: "s86", Kind: 2}), new Symbol({Name: "s87", Kind: 3}), new Symbol({Name: "s88", Kind: 4}), new Symbol({Name: "s89", Kind: 5}), new Symbol({Name: "s90", Kind: 6}), new Symbol({Name: "s91", Kind: 0}), new Symbol({Name: "s92", Kind: 1}), new Symbol({Name: "s93", Kind: 2}), new Symbol({Name: "s94", Kind: 3}), new Symbol({Name: "s95", Kind: 4}), new Symbol({Name: "s96", Kind: 5}), new Symbol({Name: "s97", Kind: 6}), new Symbol({Name: "s98", Kind: 0}), new Symbol({Name: "s99", Kind: 1}), new Symbol({Name: "s100", Kind: 2}), new Symbol({Name: "s101", Kind: 3}), new Symbol({Name: "s102", Kind: 4}), new Symbol({Name: "s103", Kind: 5}), new Symbol({Name: "s104", Kind: 6}), new Symbol({Name: "s105", Kind: 0}), new Symbol({Name: "s106", Kind: 1}), new Symbol({Name: "s107", Kind: 2}), new Symbol({Name: "s108", Kind: 3}), new Symbol({Name: "s109", Kind: 4}), new Symbol({Name: "s110", Kind: 5}), new Symbol({Name: "s111", Kind: 6}), new Symbol({Name: "s112", Kind: 0}), new Symbol({Name: "s113", Kind: 1}), new Symbol({Name: "s114", Kind: 2}), new Symbol({Name: "s115", Kind: 3}), new Symbol({Name: "s116", Kind: 4}), new Symbol({Name: "s117", Kind: 5}), new Symbol({Name: "s118", Kind: 6}), new Symbol({Name: "s119", Kind: 0}), new Symbol({Name: "s120", Kind: 1}), new Symbol({Name: "s121", Kind: 2}), new Symbol({Name: "s122", Kind: 3}), new Symbol({Name: "s123", Kind: 4}), new Symbol({Name: "s124", Kind: 5}), new Symbol({Name: "s125", Kind: 6}), new Symbol({Name: "s126", Kind: 0}), new Symbol({Name: "s127", Kind: 1}), new Symbol({Name: "s128", Kind: 2}), new Symbol({Name: "s129", Kind: 3}), new Symbol({Name: "s130", Kind: 4}), new Symbol({Name: "s131", Kind: 5}), new Symbol({Name: "s132", Kind: 6}), new Symbol({Name: "s133", Kind: 0}), new Symbol({Name: "s134", Kind: 1}), new Symbol({Name: "s135", Kind: 2}), new Symbol({Name: "s136", Kind: 3}), new Symbol({Name: "s137", Kind: 4}), new Symbol({Name: "s138", Kind: 5}), new Symbol({Name: "s139", Kind: 6}), new Symbol({Name: "s140", Kind: 0}), new Symbol({Name: "s141", Kind: 1}), new Symbol({Name: "s142", Kind: 2}), new Symbol({Name: "s143", Kind: 3}), new Symbol({Name: "s144", Kind: 4}), new Symbol({Name: "s145", Kind: 5}), new Symbol({Name: "s146", Kind: 6}), new Symbol({Name: "s147", Kind: 0}), new Symbol({Name: "s148", Kind: 1}), new Symbol({Name: "s149", Kind: 2}), new Symbol({Name: "s150", Kind: 3}), new Symbol({Name: "s151", Kind: 4}), new Symbol({Name: "s152", Kind: 5}), new Symbol({Name: "s153", Kind: 6}), new Symbol({Name: "s154", Kind: 0}), new Symbol({Name: "s155", Kind: 1}), new Symbol({Name: "s156", Kind: 2}), new Symbol({Name: "s157", Kind: 3}), new Symbol({Name: "s158", Kind: 4}), new Symbol({Name: "s159", Kind: 5}), new Symbol({Name: "s160", Kind: 6}), new Symbol({Name: "s161", Kind: 0}), new Symbol({Name: "s162", Kind: 1}), new Symbol({Name: "s163", Kind: 2}), new Symbol({Name: "s164", Kind: 3}), new Symbol({Name: "s165", Kind: 4}), new Symbol({Name: "s166", Kind: 5}), new Symbol({Name: "s167", Kind: 6}), new Symbol({Name: "s168", Kind: 0}), new Symbol({Name: "s169", Kind: 1}), new Symbol({Name: "s170", Kind: 2}), new Symbol({Name: "s171", Kind: 3}), new Symbol({Name: "s172", Kind: 4}), new Symbol({Name: "s173", Kind: 5}), new Symbol({Name: "s174", Kind: 6}), new Symbol({Name: "s175", Kind: 0}), new Symbol({Name: "s176", Kind: 1}), new Symbol({Name: "s177", Kind: 2}), new Symbol({Name: "s178", Kind: 3}), new Symbol({Name: "s179", Kind: 4}), new Symbol({Name: "s180", Kind: 5}), new Symbol({Name: "s181", Kind: 6}), new Symbol({Name: "s182", Kind: 0}), new Symbol({Name: "s183", Kind: 1}), new Symbol({Name: "s184", Kind: 2}), new Symbol({Name: "s185", Kind: 3}), new Symbol({Name: "s186", Kind: 4}), new Symbol({Name: "s187", Kind: 5}), new Symbol({Name: "s188", Kind: 6}), new Symbol({Name: "s189", Kind: 0}), new Symbol({Name: "s190", Kind: 1}), new Symbol({Name: "s191", Kind: 2}), new Symbol({Name: "s192", Kind: 3}), new Symbol({Name: "s193", Kind: 4}), new Symbol({Name: "s194", Kind: 5}), new Symbol({Name: "s195", Kind: 6}), new Symbol({Name: "s196", Kind: 0}), new Symbol({Name: "s197", Kind: 1}), new Symbol({Name: "s198", Kind: 2}), new Symbol({Name: "s199", Kind: 3}), new Symbol({Name: "s200", Kind: 4}), new Symbol({Name: "s201", Kind: 5}), new Symbol({Name: "s202", Kind: 6}), new Symbol({Name: "s203", Kind: 0}), new Symbol({Name: "s204", Kind: 1}), new Symbol({Name: "s205", Kind: 2}), new Symbol({Name: "s206", Kind: 3}), new Symbol({Name: "s207", Kind: 4}), new Symbol({Name: "s208", Kind: 5}), new Symbol({Name: "s209", Kind: 6}), new Symbol({Name: "s210", Kind: 0}), new Symbol({Name: "s211", Kind: 1}), new Symbol({Name: "s212", Kind: 2}), new Symbol({Name: "s213", Kind: 3}), new Symbol({Name: "s214", Kind: 4}), new Symbol({Name: "s215", Kind: 5}), new Symbol({Name: "s216", Kind: 6}), new Symbol({Name: "s217", Kind: 0}), new Symbol({Name: "s218", Kind: 1}), new Symbol({Name: "s219", Kind: 2}), new Symbol({Name: "s220", Kind: 3}), new Symbol({Name: "s221", Kind: 4}), new Symbol({Name: "s222", Kind: 5}), new Symbol({Name: "s223", Kind: 6}), new Symbol({Name: "s224", Kind: 0}), new Symbol({Name: "s225", Kind: 1}), new Symbol({Name: "s226", Kind: 2}), new Symbol({Name: "s227", Kind: 3}), new Symbol({Name: "s228", Kind: 4}), new Symbol({Name: "s229", Kind: 5}), new Symbol({Name: "s230", Kind: 6}), new Symbol({Name: "s231", Kind: 0}), new Symbol({Name: "s232", Kind: 1}), new Symbol({Name: "s233", Kind: 2}), new Symbol({Name: "s234", Kind: 3}), new Symbol({Name: "s235", Kind: 4}), new Symbol({Name: "s236", Kind: 5}), new Symbol({Name: "s237", Kind: 6}), new Symbol({Name: "s238", Kind: 0}), new Symbol({Name: "s239", Kind: 1}), new Symbol({Name: "s240", Kind: 2}), new Symbol({Name: "s241", Kind: 3}), new Symbol({Name: "s242", Kind: 4}), new Symbol({Name: "s243", Kind: 5}), new Symbol({Name: "s244", Kind: 6}), new Symbol({Name: "s245", Kind: 0}), new Symbol({Name: "s246", Kind: 1}), new Symbol({Name: "s247", Kind: 2}), new Symbol({Name: "s248", Kind: 3}), new Symbol({Name: "s249", Kind: 4}), new Symbol({Name: "s250", Kind: 5}), new Symbol({Name: "s251", Kind: 6}), new Symbol({Name: "s252", Kind: 0}), new Symbol({Name: "s253", Kind: 1}), new Symbol({Name: "s254", Kind: 2}), new Symbol({Name: "s255", Kind: 3}), new Symbol({Name: "s256", Kind: 4}), new Symbol({Name: "s257", Kind: 5}), new Symbol({Name: "s258", Kind: 6}), new Symbol({Name: "s259", Kind: 0})])
	}
}

export function __goscript_get_Symbols(): $.Slice<Symbol | $.VarRef<Symbol> | null> {
	if (((Symbols) as any) === undefined) {
		__goscript_init_Symbols()
	}
	return Symbols
}

export function __goscript_set_Symbols(__goscriptValue: $.Slice<Symbol | $.VarRef<Symbol> | null>): void {
	Symbols = __goscriptValue
}

export var Index: globalThis.Map<string, number> | null

export function __goscript_init_Index(): void {
	if (((Index) as any) === undefined) {
		Index = $.makeMap<string, number>([["k0", 0], ["k1", 1], ["k2", 2], ["k3", 3], ["k4", 4], ["k5", 5], ["k6", 6], ["k7", 7], ["k8", 8], ["k9", 9], ["k10", 10], ["k11", 11], ["k12", 12], ["k13", 13], ["k14", 14], ["k15", 15], ["k16", 16], ["k17", 17], ["k18", 18], ["k19", 19], ["k20", 20], ["k21", 21], ["k22", 22], ["k23", 23], ["k24", 24], ["k25", 25], ["k26", 26], ["k27", 27], ["k28", 28], ["k29", 29], ["k30", 30], ["k31", 31], ["k32", 32], ["k33", 33], ["k34", 34], ["k35", 35], ["k36", 36], ["k37", 37], ["k38", 38], ["k39", 39], ["k40", 40], ["k41", 41], ["k42", 42], ["k43", 43], ["k44", 44], ["k45", 45], ["k46", 46], ["k47", 47], ["k48", 48], ["k49", 49], ["k50", 50], ["k51", 51], ["k52", 52], ["k53", 53], ["k54", 54], ["k55", 55], ["k56", 56], ["k57", 57], ["k58", 58], ["k59", 59], ["k60", 60], ["k61", 61], ["k62", 62], ["k63", 63], ["k64", 64], ["k65", 65], ["k66", 66], ["k67", 67], ["k68", 68], ["k69", 69], ["k70", 70], ["k71", 71], ["k72", 72], ["k73", 73], ["k74", 74], ["k75", 75], ["k76", 76], ["k77", 77], ["k78", 78], ["k79", 79], ["k80", 80], ["k81", 81], ["k82", 82], ["k83", 83], ["k84", 84], ["k85", 85], ["k86", 86], ["k87", 87], ["k88", 88], ["k89", 89], ["k90", 90], ["k91", 91], ["k92", 92], ["k93", 93], ["k94", 94], ["k95", 95], ["k96", 96], ["k97", 97], ["k98", 98], ["k99", 99], ["k100", 100], ["k101", 101], ["k102", 102], ["k103", 103], ["k104", 104], ["k105", 105], ["k106", 106], ["k107", 107], ["k108", 108], ["k109", 109], ["k110", 110], ["k111", 111], ["k112", 112], ["k113", 113], ["k114", 114], ["k115", 115], ["k116", 116], ["k117", 117], ["k118", 118], ["k119", 119], ["k120", 120], ["k121", 121], ["k122", 122], ["k123", 123], ["k124", 124], ["k125", 125], ["k126", 126], ["k127", 127], ["k128", 128], ["k129", 129], ["k130", 130], ["k131", 131], ["k132", 132], ["k133", 133], ["k134", 134], ["k135", 135], ["k136", 136], ["k137", 137], ["k138", 138], ["k139", 139], ["k140", 140], ["k141", 141], ["k142", 142], ["k143", 143], ["k144", 144], ["k145", 145], ["k146", 146], ["k147", 147], ["k148", 148], ["k149", 149], ["k150", 150], ["k151", 151], ["k152", 152], ["k153", 153], ["k154", 154], ["k155", 155], ["k156", 156], ["k157", 157], ["k158", 158], ["k159", 159], ["k160", 160], ["k161", 161], ["k162", 162], ["k163", 163], ["k164", 164], ["k165", 165], ["k166", 166], ["k167", 167], ["k168", 168], ["k169", 169], ["k170", 170], ["k171", 171], ["k172", 172], ["k173", 173], ["k174", 174], ["k175", 175], ["k176", 176], ["k177", 177], ["k178", 178], ["k179", 179], ["k180", 180], ["k181", 181], ["k182", 182], ["k183", 183], ["k184", 184], ["k185", 185], ["k186", 186], ["k187", 187], ["k188", 188], ["k189", 189], ["k190", 190], ["k191", 191], ["k192", 192], ["k193", 193], ["k194", 194], ["k195", 195], ["k196", 196], ["k197", 197], ["k198", 198], ["k199", 199], ["k200", 200], ["k201", 201], ["k202", 202], ["k203", 203], ["k204", 204], ["k205", 205], ["k206", 206], ["k207", 207], ["k208", 208], ["k209", 209], ["k210", 210], ["k211", 211], ["k212", 212], ["k213", 213], ["k214", 214], ["k215", 215], ["k216", 216], ["k217", 217], ["k218", 218], ["k219", 219], ["k220", 220], ["k221", 221], ["k222", 222], ["k223", 223], ["k224", 224], ["k225", 225], ["k226", 226], ["k227", 227], ["k228", 228], ["k229", 229], ["k230", 230], ["k231", 231], ["k232", 232], ["k233", 233], ["k234", 234], ["k235", 235], ["k236", 236], ["k237", 237], ["k238", 238], ["k239", 239], ["k240", 240], ["k241", 241], ["k242", 242], ["k243", 243], ["k244", 244], ["k245", 245], ["k246", 246], ["k247", 247], ["k248", 248], ["k249", 249], ["k250", 250], ["k251", 251], ["k252", 252], ["k253", 253], ["k254", 254], ["k255", 255], ["k256", 256], ["k257", 257], ["k258", 258], ["k259", 259]])
	}
}

export function __goscript_get_Index(): globalThis.Map<string, number> | null {
	if (((Index) as any) === undefined) {
		__goscript_init_Index()
	}
	return Index
}

export function __goscript_set_Index(__goscriptValue: globalThis.Map<string, number> | null): void {
	Index = __goscriptValue
}

export var Replaced: $.Slice<number>

export function __goscript_init_Replaced(): void {
	if (((Replaced) as any) === undefined) {
		Replaced = $.arrayToSlice<number>([0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 123, 126, 129, 132, 135, 138, 141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171, 174, 177, 180, 183, 186, 189, 192, 195, 198, 201, 204, 207, 210, 213, 216, 219, 222, 225, 228, 231, 234, 237, 240, 243, 246, 249, 252, 255, 258, 261, 264, 267, 270, 273, 276, 279, 282, 285, 288, 291, 294, 297, 300, 303, 306, 309, 312, 315, 318, 321, 324, 327, 330, 333, 336, 339, 342, 345, 348, 351, 354, 357, 360, 363, 366, 369, 372, 375, 378, 381, 384, 387, 390, 393, 396, 399, 402, 405, 408, 411, 414, 417, 420, 423, 426, 429, 432, 435, 438, 441, 444, 447, 450, 453, 456, 459, 462, 465, 468, 471, 474, 477, 480, 483, 486, 489, 492, 495, 498, 501, 504, 507, 510, 513, 516, 519, 522, 525, 528, 531, 534, 537, 540, 543, 546, 549, 552, 555, 558, 561, 564, 567, 570, 573, 576, 579, 582, 585, 588, 591, 594, 597, 600, 603, 606, 609, 612, 615, 618, 621, 624, 627, 630, 633, 636, 639, 642, 645, 648, 651, 654, 657, 660, 663, 666, 669, 672, 675, 678, 681, 684, 687, 690, 693, 696, 699, 702, 705, 708, 711, 714, 717, 720, 723, 726, 729, 732, 735, 738, 741, 744, 747, 750, 753, 756, 759, 762, 765, 768, 771, 774, 777, 780, 783, 786, 789, 792, 795, 798, 801, 804, 807, 810, 813, 816, 819, 822, 825, 828, 831, 834, 837, 840, 843, 846, 849, 852, 855, 858, 861, 864, 867, 870, 873, 876, 879, 882, 885, 888, 891, 894, 897])
	}
}

export function __goscript_get_Replaced(): $.Slice<number> {
	if (((Replaced) as any) === undefined) {
		__goscript_init_Replaced()
	}
	return Replaced
}

export function __goscript_set_Replaced(__goscriptValue: $.Slice<number>): void {
	Replaced = __goscriptValue
}

export var Changed: $.Slice<number>

export function __goscript_init_Changed(): void {
	if (((Changed) as any) === undefined) {
		Changed = $.arrayToSlice<number>([0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 123, 126, 129, 132, 135, 138, 141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171, 174, 177, 180, 183, 186, 189, 192, 195, 198, 201, 204, 207, 210, 213, 216, 219, 222, 225, 228, 231, 234, 237, 240, 243, 246, 249, 252, 255, 258, 261, 264, 267, 270, 273, 276, 279, 282, 285, 288, 291, 294, 297, 300, 303, 306, 309, 312, 315, 318, 321, 324, 327, 330, 333, 336, 339, 342, 345, 348, 351, 354, 357, 360, 363, 366, 369, 372, 375, 378, 381, 384, 387, 390, 393, 396, 399, 402, 405, 408, 411, 414, 417, 420, 423, 426, 429, 432, 435, 438, 441, 444, 447, 450, 453, 456, 459, 462, 465, 468, 471, 474, 477, 480, 483, 486, 489, 492, 495, 498, 501, 504, 507, 510, 513, 516, 519, 522, 525, 528, 531, 534, 537, 540, 543, 546, 549, 552, 555, 558, 561, 564, 567, 570, 573, 576, 579, 582, 585, 588, 591, 594, 597, 600, 603, 606, 609, 612, 615, 618, 621, 624, 627, 630, 633, 636, 639, 642, 645, 648, 651, 654, 657, 660, 663, 666, 669, 672, 675, 678, 681, 684, 687, 690, 693, 696, 699, 702, 705, 708, 711, 714, 717, 720, 723, 726, 729, 732, 735, 738, 741, 744, 747, 750, 753, 756, 759, 762, 765, 768, 771, 774, 777, 780, 783, 786, 789, 792, 795, 798, 801, 804, 807, 810, 813, 816, 819, 822, 825, 828, 831, 834, 837, 840, 843, 846, 849, 852, 855, 858, 861, 864, 867, 870, 873, 876, 879, 882, 885, 888, 891, 894, 897])
	}
}

export function __goscript_get_Changed(): $.Slice<number> {
	if (((Changed) as any) === undefined) {
		__goscript_init_Changed()
	}
	return Changed
}

export function __goscript_set_Changed(__goscriptValue: $.Slice<number>): void {
	Changed = __goscriptValue
}

function __goscriptInit0(): void {
	// A write before the first read replaces the table.
	__goscript_set_Replaced($.arrayToSlice<number>([1, 2, 3]))

	// A change after a read applies to the built table.
	$.indexRef(__goscript_get_Changed()!, 0).value = 99
}

export async function main(): globalThis.Promise<void> {
	// Values of the tables are their literals.
	await $.println("numbers", $.sliceLen(__goscript_get_Numbers()), $.arrayIndex(__goscript_get_Numbers()!, 0), $.arrayIndex(__goscript_get_Numbers()!, 299))
	await $.println("symbols", $.sliceLen(__goscript_get_Symbols()), $.pointerValue<Symbol>($.arrayIndex(__goscript_get_Symbols()!, 5)).Name, $.pointerValue<Symbol>($.arrayIndex(__goscript_get_Symbols()!, 259)).Kind)
	await $.println("index", $.len(__goscript_get_Index()), $.mapGet<string, number, number>(__goscript_get_Index(), "k7", 0)[0], $.mapGet<string, number, number>(__goscript_get_Index(), "k259", 0)[0])

	// Reads see the same pointers each time.
	let p = $.arrayIndex(__goscript_get_Symbols()!, 3)
	$.pointerValue<Symbol>(p).Kind = 42
	await $.println("same", $.pointerEqual($.arrayIndex(__goscript_get_Symbols()!, 3), p), $.pointerValue<Symbol>($.arrayIndex(__goscript_get_Symbols()!, 3)).Kind)

	// Writes before and after the first read are kept.
	await $.println("replaced", $.sliceLen(__goscript_get_Replaced()), $.arrayIndex(__goscript_get_Replaced()!, 2))
	await $.println("changed", $.arrayIndex(__goscript_get_Changed()!, 0), $.arrayIndex(__goscript_get_Changed()!, 1))
}

__goscriptInit0()

if ($.isMainScript(import.meta)) {
	await main()
}
