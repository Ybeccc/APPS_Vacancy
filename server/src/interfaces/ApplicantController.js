const CreateApplicantUseCase = require('../application/CreateApplicantUseCase');
const GetApplicantUseCase = require('../application/GetApplicantUseCase');
const SequelizeApplicantRepository = require('../interface_adapters/SequelizeApplicantRepository');

class ApplicantController {
    constructor() {
        const applicantRepository = new SequelizeApplicantRepository();
        this.createApplicantUseCase = new CreateApplicantUseCase(applicantRepository);
        this.getApplicantUseCase = new GetApplicantUseCase(applicantRepository);
    }

    async createApplicant(req, res) {
        try {
            const { aplName, aplNim, aplEmail, aplProdi, aplAkt, aplCrsId } = req.body;

            // Validate all required fields
            if (!aplName || !aplNim || !aplEmail || !aplProdi || !aplAkt || !aplCrsId) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            // Extract file paths if provided
            const suratLamaranPath = req.files?.aplSuratLamaran?.[0]?.path || null;
            const cvPath = req.files?.aplCv?.[0]?.path || null;
            const khsPath = req.files?.aplKhs?.[0]?.path || null;

            // Ensure all files are uploaded
            if (!suratLamaranPath || !cvPath || !khsPath) {
                return res.status(400).json({ message: 'All PDF files are required.' });
            }

            // Prepare the complete applicant data
            const fullApplicantData = {
                aplName,
                aplNim,
                aplEmail,
                aplProdi,
                aplAkt,
                aplCrsId,
                aplSuratLamaran: suratLamaranPath,
                aplCv: cvPath,
                aplKhs: khsPath,
            };

            // Log data for debugging
            console.log('Saving Applicant Data:', fullApplicantData);

            // Execute the use case to save data
            const response = await this.createApplicantUseCase.execute(fullApplicantData);

            // Return the response
            res.status(response.code).json(response);
        } catch (error) {
            console.error('Error creating applicant:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }

    async getAll(req, res) {
        try {
            const applicants = await this.getApplicantUseCase.getAll();
            res.status(200).json({ data: applicants });
        } catch (error) {
            console.error('Error retrieving applicants:', error);
            res.status(500).json({ message: 'Failed to retrieve applicants', error: error.message });
        }
    }
}

module.exports = ApplicantController;