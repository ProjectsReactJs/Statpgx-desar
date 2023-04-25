import { NextApiRequest, NextApiResponse } from "next";
import { FileManagementDate } from "types/interfaces";

const data: FileManagementDate[] = [
    {
        id: 1,
        patientId: 46243,
        date: "2023-03-21T00:00:00",
        status: '',
        patientName: "D.D",
        doctorName: "Daniel Martinez, MD",
        representative: "Parul Patel",
        repUserName: "Parul.Patel@frogmd.com",
        insurance: "Medicare",
        requisitionForm: "https://a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/RequisitionForm/RF_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_8c073174-219a-4838-a8b2-64ea82090118.pdf",
        supportingDocument: "https://a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/SupportingDocuments/SD_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_6f20ca8a-8e98-49ef-83ed-0348c06de3a1.pdf",
        insuranceCard: '',
        checklist: "https://a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/Checklist/CL_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_e9efaab5-fbb1-4935-9a9d-0a638c6e5990.pdf",
        testType: "Pharmacogenomics",
        requisitionId: 632,
        testHistoryId: 78200
    },
    {
        id: 2,
        patientId: 46124,
        date: "2023-03-11T00:00:00",
        status: 'bloqueado',
        patientName: "F.F",
        doctorName: "Felicia del Carmen Jardim, FJ",
        representative: "Zila Patel Parul",
        repUserName: "Zila.Patel@frogmd.com",
        insurance: "Medicare",
        requisitionForm: "https://69559a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/RequisitionForm/RF_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_8c073174-219a-4838-a8b2-64ea82090118.pdf",
        supportingDocument: "https://sddsda9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/SupportingDocuments/SD_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_6f20ca8a-8e98-49ef-83ed-0348c06de3a1.pdf",
        insuranceCard: 'prueba de file ',
        checklist: "https://sfdfa9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/Checklist/CL_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_e9efaab5-fbb1-4935-9a9d-0a638c6e5990.pdf",
        testType: "Cogenomics",
        requisitionId: 741,
        testHistoryId: 56725
    },
    {
        id: 3,
        patientId: 89412,
        date: "2023-03-22T00:00:00",
        status: 'bloqueado',
        patientName: "L.M",
        doctorName: "Luis Alejandro Martinez, LM",
        representative: "Marti Lins",
        repUserName: "Marti.Lins@frogmd.com",
        insurance: "Medicare",
        requisitionForm: "https://ipa9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/RequisitionForm/RF_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_8c073174-219a-4838-a8b2-64ea82090118.pdf",
        supportingDocument: "https://uioa9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/SupportingDocuments/SD_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_6f20ca8a-8e98-49ef-83ed-0348c06de3a1.pdf",
        insuranceCard: 'prueba de file ',
        checklist: "https://alk9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/Checklist/CL_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_e9efaab5-fbb1-4935-9a9d-0a638c6e5990.pdf",
        testType: "Penomics",
        requisitionId: 485,
        testHistoryId: 55672
    },
    {
        id: 4,
        patientId: 89421,
        date: "2023-02-14T00:00:00",
        status: '',
        patientName: "D.L",
        doctorName: "Pedro Martinez, PM",
        representative: "Parul Patel",
        repUserName: "Parul.Patel@frogmd.com",
        insurance: "Medicare",
        requisitionForm: "https://a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/RequisitionForm/RF_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_8c073174-219a-4838-a8b2-64ea82090118.pdf",
        supportingDocument: "https://a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/SupportingDocuments/SD_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_6f20ca8a-8e98-49ef-83ed-0348c06de3a1.pdf",
        insuranceCard: '',
        checklist: "https://a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/Checklist/CL_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_e9efaab5-fbb1-4935-9a9d-0a638c6e5990.pdf",
        testType: "Pharmacogenomics",
        requisitionId: 145,
        testHistoryId: 55587
    },
    {
        id: 5,
        patientId: 95472,
        date: "2023-01-30T00:00:00",
        status: 'activo',
        patientName: "R.M",
        doctorName: "Tomas Lopez, TL",
        representative: "Parul Patel",
        repUserName: "Parul.Patel@frogmd.com",
        insurance: "Medicare",
        requisitionForm: "https://ERDa9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/RequisitionForm/RF_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_8c073174-219a-4838-a8b2-64ea82090118.pdf",
        supportingDocument: "https://S3E4a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/SupportingDocuments/SD_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_6f20ca8a-8e98-49ef-83ed-0348c06de3a1.pdf",
        insuranceCard: 'prueba de file ',
        checklist: "https://A3S2a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/Checklist/CL_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_e9efaab5-fbb1-4935-9a9d-0a638c6e5990.pdf",
        testType: "Pics",
        requisitionId: 136,
        testHistoryId: 12585
    },
    {
        id: 6,
        patientId: 89412,
        date: "2023-03-22T00:00:00",
        status: 'bloqueado',
        patientName: "L.M",
        doctorName: "Luis Alejandro Martinez, LM",
        representative: "Marti Lins",
        repUserName: "Marti.Lins@frogmd.com",
        insurance: "Medicare",
        requisitionForm: "https://ipa9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/RequisitionForm/RF_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_8c073174-219a-4838-a8b2-64ea82090118.pdf",
        supportingDocument: "https://uioa9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/SupportingDocuments/SD_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_6f20ca8a-8e98-49ef-83ed-0348c06de3a1.pdf",
        insuranceCard: 'prueba de file ',
        checklist: "https://alk9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/Checklist/CL_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_e9efaab5-fbb1-4935-9a9d-0a638c6e5990.pdf",
        testType: "Penomics",
        requisitionId: 485,
        testHistoryId: 55672
    },
    {
        id: 7,
        patientId: 89421,
        date: "2023-02-14T00:00:00",
        status: '',
        patientName: "D.L",
        doctorName: "Pedro Martinez, PM",
        representative: "Parul Patel",
        repUserName: "Parul.Patel@frogmd.com",
        insurance: "Medicare",
        requisitionForm: "https://a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/RequisitionForm/RF_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_8c073174-219a-4838-a8b2-64ea82090118.pdf",
        supportingDocument: "https://a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/SupportingDocuments/SD_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_6f20ca8a-8e98-49ef-83ed-0348c06de3a1.pdf",
        insuranceCard: '',
        checklist: "https://a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/Checklist/CL_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_e9efaab5-fbb1-4935-9a9d-0a638c6e5990.pdf",
        testType: "Pharmacogenomics",
        requisitionId: 145,
        testHistoryId: 55587
    },
    {
        id: 8,
        patientId: 95472,
        date: "2023-01-30T00:00:00",
        status: 'activo',
        patientName: "R.M",
        doctorName: "Tomas Lopez, TL",
        representative: "Parul Patel",
        repUserName: "Parul.Patel@frogmd.com",
        insurance: "Medicare",
        requisitionForm: "https://ERDa9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/RequisitionForm/RF_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_8c073174-219a-4838-a8b2-64ea82090118.pdf",
        supportingDocument: "https://S3E4a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/SupportingDocuments/SD_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_6f20ca8a-8e98-49ef-83ed-0348c06de3a1.pdf",
        insuranceCard: 'prueba de file ',
        checklist: "https://A3S2a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/Checklist/CL_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_e9efaab5-fbb1-4935-9a9d-0a638c6e5990.pdf",
        testType: "Pics",
        requisitionId: 136,
        testHistoryId: 12585
    },
    {
        id: 9,
        patientId: 89412,
        date: "2023-03-22T00:00:00",
        status: 'bloqueado',
        patientName: "L.M",
        doctorName: "Luis Alejandro Martinez, LM",
        representative: "Marti Lins",
        repUserName: "Marti.Lins@frogmd.com",
        insurance: "Medicare",
        requisitionForm: "https://ipa9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/RequisitionForm/RF_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_8c073174-219a-4838-a8b2-64ea82090118.pdf",
        supportingDocument: "https://uioa9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/SupportingDocuments/SD_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_6f20ca8a-8e98-49ef-83ed-0348c06de3a1.pdf",
        insuranceCard: 'prueba de file ',
        checklist: "https://alk9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/Checklist/CL_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_e9efaab5-fbb1-4935-9a9d-0a638c6e5990.pdf",
        testType: "Penomics",
        requisitionId: 485,
        testHistoryId: 55672
    },
    {
        id: 10,
        patientId: 89421,
        date: "2023-02-14T00:00:00",
        status: '',
        patientName: "D.L",
        doctorName: "Pedro Martinez, PM",
        representative: "Parul Patel",
        repUserName: "Parul.Patel@frogmd.com",
        insurance: "Medicare",
        requisitionForm: "https://a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/RequisitionForm/RF_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_8c073174-219a-4838-a8b2-64ea82090118.pdf",
        supportingDocument: "https://a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/SupportingDocuments/SD_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_6f20ca8a-8e98-49ef-83ed-0348c06de3a1.pdf",
        insuranceCard: '',
        checklist: "https://a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/Checklist/CL_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_e9efaab5-fbb1-4935-9a9d-0a638c6e5990.pdf",
        testType: "Pharmacogenomics",
        requisitionId: 145,
        testHistoryId: 55587
    },
    {
        id: 11,
        patientId: 95472,
        date: "2023-01-30T00:00:00",
        status: 'activo',
        patientName: "R.M",
        doctorName: "Tomas Lopez, TL",
        representative: "Parul Patel",
        repUserName: "Parul.Patel@frogmd.com",
        insurance: "Medicare",
        requisitionForm: "https://ERDa9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/RequisitionForm/RF_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_8c073174-219a-4838-a8b2-64ea82090118.pdf",
        supportingDocument: "https://S3E4a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/SupportingDocuments/SD_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_6f20ca8a-8e98-49ef-83ed-0348c06de3a1.pdf",
        insuranceCard: 'prueba de file ',
        checklist: "https://A3S2a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/Checklist/CL_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_e9efaab5-fbb1-4935-9a9d-0a638c6e5990.pdf",
        testType: "Pics",
        requisitionId: 136,
        testHistoryId: 12585
    },
    {
        id: 12,
        patientId: 95472,
        date: "2023-01-30T00:00:00",
        status: 'activo',
        patientName: "R.M",
        doctorName: "Tomas Lopez, TL",
        representative: "Parul Patel",
        repUserName: "Parul.Patel@frogmd.com",
        insurance: "Medicare",
        requisitionForm: "https://ERDa9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/RequisitionForm/RF_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_8c073174-219a-4838-a8b2-64ea82090118.pdf",
        supportingDocument: "https://S3E4a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/SupportingDocuments/SD_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_6f20ca8a-8e98-49ef-83ed-0348c06de3a1.pdf",
        insuranceCard: 'prueba de file ',
        checklist: "https://A3S2a9a8c8d6cc5c94121837951d.blob.core.windows.net/documentsprod/2023/Mar/Checklist/CL_DebbieG.Doe_DOB1992-02-02_CreatedDate_3-21-2023 3_30_28 PM_21_e9efaab5-fbb1-4935-9a9d-0a638c6e5990.pdf",
        testType: "Pics",
        requisitionId: 136,
        testHistoryId: 12585
    }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<FileManagementDate[]>) {
    const { search } = req.query;

    let fileDate: FileManagementDate[] = data;

    if (search) {
        fileDate = fileDate.filter((fileManagementDate) =>
            fileManagementDate.patientId == Number(search) ||
            fileManagementDate.date.includes(String(search)) ||
            fileManagementDate.status.includes(String(search)) ||
            fileManagementDate.patientName.includes(String(search)) ||
            fileManagementDate.doctorName.includes(String(search)) ||
            fileManagementDate.representative.includes(String(search)) ||
            fileManagementDate.repUserName.includes(String(search)) ||
            fileManagementDate.insurance.includes(String(search)) ||
            fileManagementDate.requisitionForm.includes(String(search)) ||
            fileManagementDate.supportingDocument.includes(String(search)) ||
            fileManagementDate.insuranceCard.includes(String(search)) ||
            fileManagementDate.checklist.includes(String(search)) ||
            fileManagementDate.testType.includes(String(search)) ||
            fileManagementDate.requisitionId == Number(search) ||
            fileManagementDate.testHistoryId == Number(search)
        );
    }

    res.status(200).json(fileDate);
}