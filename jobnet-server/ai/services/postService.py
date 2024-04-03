from utils.GPT import GPT
import fitz
import os
import pytesseract
import tempfile
import json
import uuid


class PostService:

    def askGPT(question):
        return GPT.chat(question)

    def generatePost(language, title, profession, benefits, levels, locations, degrees, workType, yearExp, requireNumber, otherRequirements, minSalary, maxSalary):
        promt = """Tạo một bản mô tả công việc bằng {} với 4 phần chính (mô tả, yêu cầu, phúc lợi, địa điểm làm việc):
            title: {}
            profession: {}
            levels: {}
            benefits: {}
            List of addresses for recruitment: {}
            degrees: {}
            workType: {}
            yearExp: {}
            requireNumber: {}
            otherRequirements: {}
            minSalary - maxSalary: {} - {}
            trả lời bằng các thẻ <h1> <h2> <h3> <p> <ul> <li>, loại bỏ title, ghi một cách chi tiết và bổ sung thông tin đối với những phần có ít thông tin
            """.format(
                title,
                levels,
                degrees,
                yearExp,
                benefits,
                language,
                workType,
                minSalary,
                locations,
                maxSalary,
                profession,
                requireNumber,
                otherRequirements,
        )
        return GPT.chat(promt)

    def parseJD(file):
        try:
            text = PDFToText(file)
            # editPromt = """sửa lại chính tả cho đoạn văn sau:
            # """ + text
            # editedText = GPT.chat(editPromt)

            promtFirst = """Hoàn thiện đoạn json, nếu không tồn tại field trong job description thì bỏ trống, chỉ trả lời kết quả json, không thay đổi tên các field:
            {   title:"string", 
                yearExp:"a number",
                workType:"full-time or part-time or", 
                minSalary:"number milion/triệu", 
                maxSalary:"number milion/triệu",
                requireNumber:"a number", 
                ortherRequirements:"string"}.Điều quan trọng là sửa tất cả các lỗi sai chính tả cho tôi.Dưới đây là đoạn văn \n
            """ + text
            json_string = GPT.chat(promtFirst)

            promtSecond = """Từ đoạn văn đã sửa trích xuất thành 4 phần chính (mô tả, yêu cầu, phúc lợi, địa điểm làm việc):
            """ + text + "\nLoại bỏ title. Đặc biệt sửa hết tất cả các lỗi sai chính tả và trả lời bằng các thẻ <h1> <h2> <h3> <p> <ul> <li>"
            content = GPT.chat(promtSecond)

            return {"data": json.loads(json_string), "content": content}

        except Exception as e:
            raise Exception(str(e))


def PDFToText(file):
    try:
        # Check if the file has a .pdf extension
        if not file.name.endswith('.pdf'):
            raise Exception("File tải lên phải là pdf")

        # Create a temporary directory for storing intermediate files
        trash_dir = os.path.join(os.getcwd(), "trash")

        # Use a context manager to handle temporary PDF file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf", dir=trash_dir) as temp_pdf:
            for chunk in file.chunks():
                temp_pdf.write(chunk)

        # Initialize an empty text variable to store the extracted text
        jd_text = ""

        # Open the PDF file using PyMuPDF (fitz)
        doc = fitz.open(temp_pdf.name)

        # Iterate through pages in the PDF
        for page in doc:
            # Create a temporary image file for the page
            image_path_temp = os.path.join(
                trash_dir, str(uuid.uuid4()) + ".jpg")
            image = page.get_pixmap(matrix=fitz.Matrix(240 / 72, 240 / 72))
            image.save(image_path_temp, "jpg")

            # Use Tesseract to extract text from the image
            temp = pytesseract.image_to_string(image_path_temp, lang='vie')
            jd_text += temp

            # Remove the temporary image file
            os.remove(image_path_temp)

        # Close the PDF document and remove the temporary PDF file
        doc.close()
        os.remove(temp_pdf.name)

        # Return the extracted text
        return jd_text

    except Exception as e:
        print(e)
        raise
