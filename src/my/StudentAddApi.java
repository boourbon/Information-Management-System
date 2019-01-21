package my;

import java.util.HashMap;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import af.web.restful.AfRestfulApi;
import my.db.Student;
import my.dbutil.C3P0Factory;

public class StudentAddApi extends AfRestfulApi
{
	@Override
	public Object execute(JSONObject jreq) throws Exception
	{
		int id = jreq.getInt("id");
		String name = jreq.getString("name");
		String phone = jreq.getString("phone");
		boolean sex = "male".equals(jreq.getString("sex"));
		
		Student row = new Student();
		row.setId(id);
		row.setName(name);
		row.setPhone(phone);
		row.setSex(sex);
		
		C3P0Factory.insert( row );
		System.out.println("StudentAdd OK");
		return null;
	}

}
