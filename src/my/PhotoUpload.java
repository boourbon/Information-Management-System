package my;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;

import org.apache.commons.io.FileUtils;
import org.json.JSONObject;

import af.sql.AfSqlUpdate;
import af.sql.AfSqlWhere;
import af.web.fileupload.AfFileUploadHandler;
import af.web.fileupload.AfFileUploadUtils;
import my.db.StudentProfile;
import my.dbutil.C3P0Factory;

public class PhotoUpload extends AfFileUploadHandler
{
	String originalFileName;
	String suffix;
	String tmpFileName;
	File tmpFile;
	OutputStream outputStream;
	
	@Override
	protected OutputStream uploadStarted(String originalFileName) throws Exception
	{
		
		this.originalFileName = originalFileName;
		this.suffix = AfFileUploadUtils.fileSuffix( originalFileName);
		this.tmpFileName = AfFileUploadUtils.createUUID() + "." + suffix;
		
		File tmpDir = new File(getWebRoot(), "upload");
		tmpDir.mkdirs();
		
		this.tmpFile = new File(tmpDir, tmpFileName);
		outputStream = new FileOutputStream(tmpFile);	
		
		System.out.println("Start uploading:" + originalFileName + " >>> " + tmpFile);
		return outputStream;
	}

	@Override
	protected void uploadProgress(long numBytes) throws Exception
	{
		if(numBytes > 1000000 * 300)
			throw new Exception("Connot exceed 300M!");
	}

	@Override
	protected void uploadError()
	{
		try{ outputStream.close();} catch(Exception e){}
	}
	
	@Override
	protected Object uploadComplete(long fileSize) throws Exception
	{
		try{ outputStream.close();} catch(Exception e){}
		System.out.println("Finish uploading:" + originalFileName );
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");
		String timestr = sdf.format(System.currentTimeMillis());
		String storePath = "data/" + timestr + tmpFileName;
		File dstFile = new File(getWebRoot(), storePath);
		dstFile.getParentFile().mkdirs(); 
		FileUtils.moveFile(tmpFile, dstFile);
		System.out.println("Storing to:" + dstFile);
		
		int id = this.getParamInt("id", 0);
		updateDb(id, storePath);
		
		String url = httpReq.getServletContext().getContextPath() + "/" + storePath;
		JSONObject result = new JSONObject();
		result.put("url", url);		
		return result;
	}

	private void updateDb (int id, String photo) throws Exception
	{
		String sql1 = "SELECT * FROM student_profile WHERE id=" + id;
		StudentProfile row = (StudentProfile)C3P0Factory.get(sql1, StudentProfile.class);
		if(row == null)
		{
			row = new StudentProfile();
			row.setId( id );
			row.setPhoto( photo );
			C3P0Factory.insert( row );
		}
		else
		{
			AfSqlUpdate u = new AfSqlUpdate("student_profile");
			u.add2("photo", photo);
			AfSqlWhere where = new AfSqlWhere();
			where.add2("id", id);
			String sss = u.toString() + where;
			C3P0Factory.execute(sss);
		}
	}


}
