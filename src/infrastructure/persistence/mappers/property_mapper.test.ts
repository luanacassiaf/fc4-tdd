import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("PropertyMapper", () => {

	it("deve converter PropertyEntity em Property corretamente", () => {
		const propertyEntity = new PropertyEntity();
		propertyEntity.id = "1";
		propertyEntity.name = "Casa do Kame";
		propertyEntity.description = "Vista para o mar";
		propertyEntity.maxGuests = 6;
		propertyEntity.basePricePerNight = 200;

		const property = PropertyMapper.toDomain(propertyEntity);
		expect(property.getId()).toBe("1");
		expect(property.getName()).toBe("Casa do Kame");
		expect(property.getDescription()).toBe("Vista para o mar");
		expect(property.getMaxGuests()).toBe(6);
		expect(property.getBasePricePerNight()).toBe(200);
	});

	it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
		const propertyEntity = new PropertyEntity();
		propertyEntity.id = "1";
		propertyEntity.name = "";
		propertyEntity.description = "Vista para o mar";
		propertyEntity.maxGuests = 6;
		propertyEntity.basePricePerNight = 200;

		expect(() => {
			PropertyMapper.toDomain(propertyEntity);
		}).toThrow("O nome da propriedade é obrigatório.");

		propertyEntity.name = "Casa do Kame";
		propertyEntity.maxGuests = 0;

		expect(() => {
			PropertyMapper.toDomain(propertyEntity);
		}).toThrow("A capacidade máxima deve ser maior que zero.");

		propertyEntity.maxGuests = 6;
		propertyEntity.basePricePerNight = 0;

		expect(() => {
			PropertyMapper.toDomain(propertyEntity);
		}).toThrow("O preço base por noite é obrigatório.");
	});

	it("deve converter Property para PropertyEntity corretamente", () => {
		const property = new Property("1", "Casa do Kame", "Vista para o mar", 6, 200);

		const propertyEntity = PropertyMapper.toPersistence(property);
		expect(propertyEntity.id).toBe("1");
		expect(propertyEntity.name).toBe("Casa do Kame");
		expect(propertyEntity.description).toBe("Vista para o mar");
		expect(propertyEntity.maxGuests).toBe(6);
		expect(propertyEntity.basePricePerNight).toBe(200);
	});
});
