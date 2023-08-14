<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mail;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;

class CartaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $mails = Mail::all();
       return $mails;
    }
    public function listById(string $id){
        $mails = Mail::where('id_floor',$id)->get();
        return  response ([
            "status" => 1,
            "msg" => "Mail list",
            "cartas" =>$mails
        ]);
    }

    public function listCarta(){
        $user_id = auth()->user()->id;
        $mails = Mail::where("id_piso", $user_id)->get();

        return response([
            "status" =>1,
            "msg" =>"Blog list",
            "data" =>$mails
        ]);
    }
    public function createCarta(Request $request)
    {
        $request->validate([
            "mail_sender" => "required",

        ]);
        $user_id = auth()->user()->id;
        $mail = new Mail();
        $mail->id_piso = $user_id;
        $mail->mail_sender = $request->mail_sender;
        $mail->content = $request->content;
        $mail->save();
        return response()->json([
            "status" => 2,
            "msg" => "Carta created succesfully",
        ]);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $mail =  Mail::find($id);
        return $mail;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $mail = Mail::findOrFail($request->id);
        $mail->mail_sender = $request->mail_sender;
        $mail->content = $request->content;
        $mail->id_floor = $request->id_floor;
        $mail->save();
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Mail::destroy($id);
        return response([
            "status" => 1,
            "msg" => "Carta eliminada correctamente",
        ]);
    }
    public function store(Request $request)
    {
        echo $request;
        $mail = new Mail();
        $mail->mail_sender = $request->mail_sender;
        $mail->content = $request->content;
        $mail->id_floor = $request->id_floor;

        $mail->save();
    }
}

