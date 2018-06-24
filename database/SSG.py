
import sqlalchemy
import json
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime

from sqlalchemy.orm import sessionmaker
from sqlalchemy import desc
from datetime import date, datetime


db = create_engine('sqlite:///database.db', echo=True)
Session = sessionmaker(bind=db)
session = Session()

Base = declarative_base()
class courses(Base):
    __tablename__ = 'courses'
    courseId = Column(Integer, primary_key=True)
    courseNumber = Column(String(100))
    courseTitle = Column(String(100))
    offeredQuarter = Column(String(100))
    description = Column(String(1000))
    link = Column(String(1000))

class links(Base):
    __tablename__ = 'links'
    linkId = Column(Integer, primary_key=True)
    linkName = Column(String(100))
    linkLocation = Column(String(5000))

class news(Base):
    __tablename__ = 'news'

    newsId = Column(Integer, primary_key=True)
    title = Column(String(100))
    description = Column(String(1000))
    date = Column(DateTime, default=datetime.utcnow)
    image1 = Column(String(2000000)) # inorder to save some disk space in the server we have to limit this is to 2mb
    imgDes1 = Column(String(100))
    image2 = Column(String(2000000))  # inorder to save some disk space in the server we have to limit this is to 2mb
    imgDes2 = Column(String(100))
    links = Column(String(10000))

class tools(Base):
    __tablename__ = 'tools'

    toolId = Column(Integer, primary_key=True)
    toolTitle = Column(String(100))
    toolDescription = Column(String(5000))
    toolImage = Column(String(5000000))

class people(Base):
    __tablename__ = 'people'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    description = Column(String(1000))
    type = Column(String(100))
    webpage = Column(String(1000))
    email = Column(String(1000))
    linkedin = Column(String(1000))
    image = Column(String(2000000)) # inorder to save some disk space in the server we have to limit this is to 2mb

class research(Base):
    __tablename__ = 'research'

    id = Column(Integer, primary_key=True)
    title = Column(String(100))
    description = Column(String(5000))
    type = Column(String(100))
    link = Column(String(1000))

class publications(Base):
    __tablename__ = 'publications'

    id = Column(Integer, primary_key=True)
    publication = Column(String(2000))
    year = Column(String(100))
    area = Column(String(500))
    type = Column(String(100))
    link = Column(String(1000))

#to get all the courses in the database
def getCourses():
    allcourses = session.query(courses).all()

    result = []
    for currCourse in allcourses:
        result.append(row_to_obj_courses(currCourse))

    return {"courses":result},200


#to get all the links in the database

def getLinks():
    allLinks = session.query(links).all()


    result = []
    for currLink in allLinks:
        result.append(row_to_obj_links(currLink))

    return {"links":result},200



#to get all the news in the database
def getNews():
    # allNews =news.query.order_by(desc(news.date)).all()
    allNews = session.query(news).order_by(desc(news.date)).all()
    result = []
    for currNews in allNews:
        result.append(row_to_obj_news(currNews))

    return {"news":result},200

#to get all the news in the database
def getNews_4():
    allNews = session.query(news).order_by(desc(news.date)).limit(4)

    result = []
    for currNews in allNews:
        result.append(row_to_obj_news(currNews))

    return {"news":result},200

#to get all the tools in the database
def getTools():
    allTools = session.query(tools).all()
    result = []
    for currTool in allTools:
        result.append(row_to_obj_tools(currTool))

    return {"tools":result},200

#to get all the faultymemebers in the database
def facultyMembers():
    allFacultyMembers =session.query(people).filter_by(type="faculty").all()

    result = []
    for currFacultyMembers in allFacultyMembers:
        result.append(row_to_obj_people(currFacultyMembers))

    return {"people":result},200


#to get all the current members in the database
def currentMembers():
    allFacultyMembers = session.query(people).filter_by(type="members").all()
    result = []
    for currFacultyMembers in allFacultyMembers:
        result.append(row_to_obj_people(currFacultyMembers))

    return {"people":result},200

#to get all the current alums in the database
def Alums():
    allFacultyMembers = session.query(people).filter_by(type="alum").all()

    result = []
    for currFacultyMembers in allFacultyMembers:
        result.append(row_to_obj_people(currFacultyMembers))

    return {"people":result},200


#to get all the news in the research details
def getResearch():
    allResearch = session.query(research).all()

    result = []
    for currResearch in allResearch:
        result.append(row_to_obj_research(currResearch))

    return {"research":result},200

#to get all the publications in the publications table
def getPublications():
    allPublications = session.query(publications).all()

    result = []
    for currPublication in allPublications:
        result.append(row_to_obj_Publication(currPublication))

    return {"publications":result},200


# data records to jason data converter fot course records
def row_to_obj_courses(row):
    row ={
        "courseId": row.courseId,
        "courseNumber": row.courseNumber,
        "courseTitle": row.courseTitle,
        "offeredQuarter": row.offeredQuarter,
        "description": row.description,
        "link": row.link
    }

    return row

# data records to jason data converter fot links records
def row_to_obj_links(row):
    row ={
        "linkId": row.linkId,
        "linkName": row.linkName,
        "linkLocation": row.linkLocation,
    }

    return row



# data records to jason data converter fot news records
def row_to_obj_news(row):
    row ={
        "newsId": row.newsId,
        "title": row.title,
        "description": row.description,
        "date": row.date,
        "image1": row.image1,
        "imgDes1": row.imgDes1,
        "image2": row.image2,
        "imgDes2": row.imgDes2,
        "links": row.links,
    }

    return row



# data records to jason data converter fot links records
def row_to_obj_tools(row):
    row ={
        "toolId": row.toolId,
        "toolTitle": row.toolTitle,
        "toolDescription": row.toolDescription,
        "toolImage": row.toolImage,
    }

    return row



# data records to jason data converter fot people records
def row_to_obj_people(row):
    row ={
        "id": row.id,
        "name": row.name,
        "description": row.description,
        "type": row.type,
        "webpage": row.webpage,
        "email": row.email,
        "linkedin": row.linkedin,
        "image": row.image,
    }

    return row

# data records to jason data converter fot research records
def row_to_obj_research(row):
    row ={
        "id": row.id,
        "title": row.title,
        "description": row.description,
        "type": row.type,
        "link": row.link,
    }

    return row



# data records to jason data converter fot research records
def row_to_obj_Publication(row):
    row ={
        "id": row.id,
        "publication": row.publication,
        "year": row.year,
        "area": row.area,
        "type": row.type,
        "link": row.link,
    }

    return row

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.now().date().isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

def dump_to_file():
    curr_dir = os.path.dirname(os.path.realpath(__file__))
    print(curr_dir)
    if not os.path.exists(curr_dir + '/../assets/json'):
        os.makedirs(curr_dir + '/../assets/json')
    with open(curr_dir + '/../assets/json/courses', 'w') as outfile:
        json.dump(getCourses(), outfile, default=json_serial)
    with open(curr_dir + '/../assets/json/links', 'w') as outfile:
        json.dump(getLinks(), outfile, default=json_serial)
    with open(curr_dir + '/../assets/json/news', 'w') as outfile:
        json.dump(getNews(), outfile, default=json_serial)
    with open(curr_dir + '/../assets/json/news_4', 'w') as outfile:
        json.dump(getNews_4(), outfile, default=json_serial)     
    with open(curr_dir + '/../assets/json/tools', 'w') as outfile:
        json.dump(getTools(), outfile, default=json_serial)
    with open(curr_dir + '/../assets/json/facultyMembers', 'w') as outfile:
        json.dump(facultyMembers(), outfile, default=json_serial)    
    with open(curr_dir + '/../assets/json/currentMembers', 'w') as outfile:
        json.dump(currentMembers(), outfile, default=json_serial)    
    with open(curr_dir + '/../assets/json/alums', 'w') as outfile:
        json.dump(Alums(), outfile, default=json_serial)    
    with open(curr_dir + '/../assets/json/research', 'w') as outfile:
        json.dump(getResearch(), outfile, default=json_serial)    
    with open(curr_dir + '/../assets/json/publications', 'w') as outfile:
        json.dump(getPublications(), outfile, default=json_serial)


def main():
    Base.metadata.create_all(db)
    dump_to_file()


if __name__ == '__main__':
    main()
