import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";

describe("BookingMapper", () => {
	let propertyEntity: PropertyEntity;
	let userEntity: UserEntity;
	let property: Property;
	let user: User;
	let dateRange: any;

	it("deve converter BookingEntity em Booking corretamente", () => {
		createAuxiliaryPersistenceEntities();

		const bookingEntity = new BookingEntity();
		bookingEntity.id = "1";
		bookingEntity.startDate = new Date("2023-10-01");
		bookingEntity.endDate = new Date("2023-10-05");
		bookingEntity.guestCount = 4;
		bookingEntity.totalPrice = 800;
		bookingEntity.status = "CONFIRMED";
		bookingEntity.property = propertyEntity;
		bookingEntity.guest = userEntity;

		const booking = BookingMapper.toDomain(bookingEntity);

		expect(booking.getId()).toBe("1");
		expect(booking.getDateRange().getStartDate()).toEqual(new Date("2023-10-01"));
		expect(booking.getDateRange().getEndDate()).toEqual(new Date("2023-10-05"));
		expect(booking.getGuestCount()).toBe(4);
		expect(booking.getTotalPrice()).toBe(800);
		expect(booking.getStatus()).toBe("CONFIRMED");
		expect(booking.getProperty().getId()).toBe("1");
		expect(booking.getGuest().getId()).toBe("guest1");
	});

	it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
		createAuxiliaryPersistenceEntities();

		const bookingEntity = new BookingEntity();
		bookingEntity.id = "1";
		bookingEntity.startDate = new Date("2023-10-01");
		bookingEntity.endDate = new Date("2023-10-05");
		bookingEntity.guestCount = 0;
		bookingEntity.totalPrice = 800;
		bookingEntity.status = "CONFIRMED";
		bookingEntity.property = propertyEntity;
		bookingEntity.guest = userEntity;

		expect(() => {
			BookingMapper.toDomain(bookingEntity);
		}).toThrow("O número de hóspedes deve ser maior que zero.");
	});

	it("deve converter Booking para BookingEntity corretamente", () => {
		createAuxiliaryDomainEntities();

		const booking = new Booking("1", property, user, dateRange, 4);

		const bookingEntity = BookingMapper.toPersistence(booking);
		expect(bookingEntity.id).toBe("1");
		expect(bookingEntity.startDate).toEqual(new Date("2023-10-01"));
		expect(bookingEntity.endDate).toEqual(new Date("2023-10-05"));
		expect(bookingEntity.guestCount).toBe(4);
		expect(bookingEntity.totalPrice).toBe(800);
		expect(bookingEntity.status).toBe("CONFIRMED");
		expect(bookingEntity.property.id).toBe("1");
		expect(bookingEntity.guest.id).toBe("guest1");
	});

	function createAuxiliaryPersistenceEntities() {
		propertyEntity = new PropertyEntity();
		propertyEntity.id = "1";
		propertyEntity.name = "Casa do Kame";
		propertyEntity.description = "Vista para o mar";
		propertyEntity.maxGuests = 6;
		propertyEntity.basePricePerNight = 200;

		userEntity = new UserEntity();
		userEntity.id = "guest1";
		userEntity.name = "Goku";
	}

	function createAuxiliaryDomainEntities() {
		property = new Property("1", "Casa do Kame", "Vista para o mar", 6, 200);
		user = new User("guest1", "Goku");
		dateRange = {
			getStartDate: () => new Date("2023-10-01"),
			getEndDate: () => new Date("2023-10-05"),
			getTotalNights: () => 4,
			overlaps: (other: any) => false,
		} as any;
	}
});
