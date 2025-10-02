import { Request, Response } from "express";
import { PropertyService } from "../../application/services/property_service";
import { CreatePropertyDTO } from "../../application/dtos/create_property_dto";

export class PropertyController {
	private propertyService: PropertyService;

	constructor(propertyService: PropertyService) {
		this.propertyService = propertyService;
	}

	async createProperty(req: Request, res: Response): Promise<Response> {
		try {
			const dto: CreatePropertyDTO = {
				name: req.body.name,
				description: req.body.description,
				maxGuests: req.body.maxGuests,
				basePricePerNight: req.body.basePricePerNight,
			};

			const property = await this.propertyService.createProperty(dto);

			return res.status(201).json({
				message: "Propriedade criada com sucesso",
				property: property,
			});
		} catch (error: any) {
			return res
				.status(400)
				.json({ message: error.message || "An unexpected error occurred" });
		}
	}
}