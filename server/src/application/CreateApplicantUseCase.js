const Response = require('../domain/entities/Response');

class CreateApplicantUseCase {
    constructor(applicantRepository) {
        this.applicantRepository = applicantRepository;
    }

    async execute(applicantData) {
        const applicant = {
            aplName: applicantData.aplName,
            aplNim: applicantData.aplNim,
            aplEmail: applicantData.aplEmail,
            aplProdi: applicantData.aplProdi,
            aplAkt: applicantData.aplAkt,
            aplCrsId: applicantData.aplCrsId,
            aplSuratLamaran: applicantData.aplSuratLamaran,
            aplCv: applicantData.aplCv,
            aplKhs: applicantData.aplKhs,
        };

        const response = new Response();

        try {
            // Attempt to create the applicant in the database
            const createdApplicant = await this.applicantRepository.create(applicant);

            if (!createdApplicant) {
                throw new Error('Failed to create applicant');
            }

            // Success response
            response.code = 200;
            response.status = 'success';
            response.message = 'Applicant Created Successfully';
            response.data = createdApplicant;
        } catch (error) {
            console.error('Database Error:', error);

            // Failure response
            response.code = 400;
            response.status = 'failed';
            response.message = 'Failed to create applicant';
            response.error = error.message;
        }

        return response;
    }
}

module.exports = CreateApplicantUseCase;