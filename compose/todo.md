## To-Do List
```kotlin
package com.example.testcompose

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import com.example.testcompose.ui.theme.TestComposeTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            TestComposeTheme {
                // A surface container using the 'background' color from the theme
                Tasks()
            }
        }
    }
}


@Composable
fun Tasks() {
    var newTask by remember { mutableStateOf("") }
    val tasks = remember { mutableStateListOf<String>() }
    val show = remember { mutableStateOf(false) }

    Column {
        Text("Tasks", color = Color.Green)


        BasicTextField(
            value = newTask,
            onValueChange = {
            newTask = it
        })

        Button(onClick = {
            //  vm.tasks.add("Hello");

            if (newTask.length > 0) {
                tasks.add(newTask)
                print("Add task $newTask")
            } else {
               show.value = true
            }
        }) {
            Text("Add task")
        }

        LazyColumn {
            items(tasks) { it ->
                Text(it)

            }
        }

if (show.value) {


    AlertDialog(
        onDismissRequest = { show.value = false },
        title = { Text("Alert") },
        text = { Text("Task cannot be empty") },
        confirmButton = {
            Button(
                onClick = { show.value = false },
                colors = ButtonDefaults.buttonColors(MaterialTheme.colorScheme.primary)
            ) {
                Text("OK")
            }
        }
    )
}

    }
}

@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    TestComposeTheme {
        Greeting("Android")
    }
}



/*
*
* */
```
