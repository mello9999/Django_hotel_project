# P-Eye-and-Friends-Hotel-Management
โปรเจ็คนี้เป็นส่วนหนึ่ง CPE231 Database  System จัดทำโดย นักศึกษาชั้นปีที่ 3 มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี

### Authors 
Member in team : 'P'EyeSangLuis Team' :dog:
> * :woman: Ms.Natchariya Wongamnuayporn 61070507204
> * :man: Mr.Natchapol Patamawisut 61070507205
> * :woman: Ms.Thanaporn Cheentada 61070507209

# Installing and Set up instructure 
#### Virtualenv & Dependencies

create a virtualenv and run requirements.txt<br/>
<b>virtualenv</b>

<pre>pip install virtualenv</pre>

<b> what is virtual environment ? </b><br/>
A virtual environment is a tool that helps to keep dependencies required by different projects separate by creating isolated python virtual environments for them. This is one of the most important tools that most of the Python developers use.
<br/>
<a href="https://www.geeksforgeeks.org/python-virtual-environment/" >read more... </a>

to run requirements.txt

<pre>$ pip install -r requirements.txt</pre>

here <b>env/</b> folder contains all dependencies

# Run at first time
<ol>
  <li>
      clone repository 
      <pre>$ git clone https://github.com/Natchariyawong25/P-EYE-and-Friends-Hotel-Management.git</pre>
  </li>
  <li>
    setting in 'setting.py  
    <pre>
      DATABASES = {
        'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'hotel',
        'USER': 'postgres',
        'PASSWORD': '*******',    //ใส่ password pgAdmin ของตัวเอง เพื่อไว้เชื่อมกับ local database 
        }
      }
    </pre>
  </li>
  <li>
    run migrations ไว้เชื่อมกับ database 
    <pre>$ python manage.py migrate</pre>
  </li>
  <li>
    now, runserver 
    <pre>$ python manage.py runserver</pre>
  </li>
 </ol>

# Run after set up instructure
<ol>
  <li>
    now, runserver 
    <pre>$ python manage.py runserver</pre>
  </li>
</ol>

# Built with 
- [x] HTML + CSS ใช้ทำหน้า Website 
- [X] django เพื่อเป็นตัวกลางในการเชื่อม database กับ pgAdmin 

# Version
> version 1.0.0 base on 13/12/2020 
