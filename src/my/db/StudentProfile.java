package my.db; 

import af.sql.annotation.AFCOLUMNS; 
import af.sql.annotation.AFTABLE; 
import java.util.Date; 

@AFTABLE(name="student_profile")  
@AFCOLUMNS(auto=true) 
public class StudentProfile 
{ 
 
	private Integer id ; 
	private String photo ; 


	public void setId(Integer id)
	{
		this.id=id;
	}
	public Integer getId()
	{
		return this.id;
	}
	public void setPhoto(String photo)
	{
		this.photo=photo;
	}
	public String getPhoto()
	{
		return this.photo;
	}

} 
 